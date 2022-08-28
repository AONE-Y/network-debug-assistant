#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::borrow::BorrowMut;
use std::collections::HashMap;
use std::thread;

use lazy_static::lazy_static;
use libc::shutdown;
use local_ip_address::list_afinet_netifas;
use net2::unix::UnixTcpBuilderExt;
use net2::TcpBuilder;
use serde::Deserialize;
use serde::Serialize;
use tauri::{Manager, Window};
use std::io::{Read, Write};
use std::net::{IpAddr, Shutdown, TcpListener};
use std::os::unix::io::AsRawFd;
use std::str::FromStr;
use std::sync::{Arc, Mutex};
use std::thread::sleep;
use std::time::Duration;
use serde::__private::de::Content::ByteBuf;
use serde::de::Unexpected::Bytes;
use tauri::api::path::BaseDirectory::Log;
use tauri::async_runtime::spawn;


fn main() {
    let network_interfaces = list_afinet_netifas().unwrap();
    let t = IpAddr::from_str("fe80::ce81:b1c:bd2c:69e").unwrap();
    println!("{}", t.is_ipv4());
    for (name, ip) in network_interfaces.iter() {
        println!(
            "{}:\t{:?}\t{:?}\t\t{:?}",
            name,
            ip,
            ip.is_ipv4(),
            ip.is_ipv6()
        );
    }

    let info = TcpServerInfo {
        localAddr: "127.0.0.1",
        localPort: 9999,
        addressReuse: false,
        keepAlive: false,
    };
    // let string = tcpServer(info);
    // println!("{}", string);
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![tcpServerOn,tcpServerOff])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[derive(Debug, Serialize, Deserialize)]
struct TcpServerInfo<'a> {
    localAddr: &'a str,
    localPort: i32,
    addressReuse: bool,
    keepAlive: bool,
}

lazy_static! {
    static ref MAPS: Arc<Mutex<HashMap<String, i32>>> = Arc::new(Mutex::new(HashMap::new()));
}
#[tauri::command]
fn tcpServerOn(info: TcpServerInfo,window:Window) -> String {
    println!("{:#?}", info);

    let addr;
    let conn = match IpAddr::from_str(info.localAddr).unwrap() {
        IpAddr::V4(_) => {
            println!("4\n");
            addr = info.localAddr.to_owned() + ":" + &info.localPort.to_string();
            TcpBuilder::new_v4().unwrap()
        }
        IpAddr::V6(_) => {
            print!("6\n");
            addr = "[".to_owned() + &info.localAddr.to_owned() + "]:" + &info.localPort.to_string();
            TcpBuilder::new_v6().unwrap()
        }
    };
    let tcp = match conn
        .reuse_address(info.addressReuse)
        .unwrap()
        .reuse_port(info.addressReuse)
        .unwrap()
        .bind(addr.clone())
    {
        Ok(tcp) => tcp.listen(42).unwrap(),
        Err(e) => {
            return e.to_string();
        }
    };
    let fd = tcp.as_raw_fd();
    window.emit_all("msg-rust", "859644fdsafjk".to_string()).unwrap();
   spawn(async move {
        for stream in tcp.incoming() {
            if stream.is_err() {
                break;
            }
            let mut stream = stream.unwrap();
            let mut buffer = [0; 1024];
            stream.read(&mut buffer).unwrap();
            stream.write("HTTP/1.1 200 OK\r\n\r\n".as_bytes()).unwrap();
            stream.write("HTTP/1.1 200 OK\r\n\r\n".as_bytes()).unwrap();
            // stream.shutdown(Shutdown::Both).unwrap();
            // println!("Request: {}", );
            print!("ttttt");
            // stream.read(&mut buffer).unwrap();
         
            // let msg=String::from_utf8_lossy(&buffer);
            window.emit("msg-rust", String::from_utf8_lossy(&buffer[..])).expect("error????????");
        }
        println!("gadfgagasg");
    });
    let maps = Arc::clone(&MAPS);
    let mut map = maps.lock().unwrap();
    map.insert(addr, fd);
    "".to_string()
}

#[tauri::command]
fn tcpServerOff(info: TcpServerInfo) -> bool {
    let addr = info.localAddr.to_owned() + ":" + &info.localPort.to_string();
    let maps = Arc::clone(&MAPS);
    let mut map = maps.lock().unwrap();
    let fd = map.remove(addr.as_str()).unwrap();
    let res;
    unsafe {
        res = libc::close(fd);
    }
    res == 0
}
