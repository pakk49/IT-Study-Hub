import { createNetworkChapters } from './network-builder.js';
// Week >= 9 is Final. Scenarios paraphrased from handouts; week10 scan notes include subnet calculations.
export const networkFinalChapters = createNetworkChapters([
  {
    "week": 9,
    "title": "Network Layer: The Data Plane",
    "description": "Network Layer คือชั้นที่พาแพ็กเก็ตไปยังเครือข่ายปลายทาง บทนี้แยกการส่งต่อในเราเตอร์ออกจากการคำนวณเส้นทาง พร้อมรู้จัก IPv4, NAT และ IPv6",
    "source": "week9-Chapter_4_V7.01.pdf · Chapter 4 Network Layer: The Data Plane",
    "groups": [
      {
        "title": "Network Layer and Router",
        "intro": "ในเราเตอร์มี 2 งานหลัก: Data Plane ส่งแพ็กเก็ตออกพอร์ตที่ถูกต้อง ส่วน Control Plane หาหรือปรับเส้นทางให้ใช้",
        "items": [
          [
            "Data Plane",
            "ส่วนของเราเตอร์ที่ส่งแพ็กเก็ตจากพอร์ตขาเข้าไปยังพอร์ตขาออก โดยอาศัยตารางส่งต่อที่มีอยู่แล้ว",
            "Datagram เข้ามาที่ eth0 แล้วถูกส่งออก eth1",
            "เราเตอร์รับ Datagram แล้วตัดสินใจ Output Port จากตารางในทันที การทำงานส่วนใดถูกใช้อยู่?"
          ],
          [
            "Control Plane",
            "ส่วนที่คำนวณหรือกำหนดเส้นทาง แล้วสร้างตารางส่งต่อให้เราเตอร์ใช้งาน",
            "Routing Protocol อัปเดต Forwarding Table",
            "ลิงก์ขัดข้องและ Router ต้องคำนวณเส้นทางใหม่เพื่ออัปเดตตาราง งานนี้เป็นหน้าที่ส่วนใด?"
          ],
          [
            "Forwarding",
            "การส่งแพ็กเก็ตภายในเราเตอร์หนึ่งเครื่องจากพอร์ตที่รับข้อมูลไปยังพอร์ตที่จะส่งออก",
            "เลือก Output Port ตาม Destination IP",
            "Packet มาถึง Router แล้ว Router ย้ายไปพอร์ต WAN ตาม Lookup Table กระบวนการใดกำลังเกิด?"
          ],
          [
            "Routing",
            "การหาเส้นทางให้ข้อมูลเดินทางผ่านเราเตอร์ต่าง ๆ จนถึงเครือข่ายปลายทาง",
            "หาเส้นทางผ่าน Router A–B–C",
            "องค์กรต้องกำหนดเส้นทาง IP ระหว่างหลายเครือข่ายให้ไปถึงปลายทางได้ ควรใช้กระบวนการใด?"
          ]
        ]
      },
      {
        "title": "Router Components and Addressing",
        "intro": "Input/Output Ports, Switching Fabric และ IPv4 CIDR ช่วยให้ Packet ถึง Interface เป้าหมาย",
        "items": [
          [
            "Switching Fabric",
            "ระบบเชื่อมต่อภายในเราเตอร์ ที่พาข้อมูลจากพอร์ตขาเข้าไปยังพอร์ตขาออก",
            "Bus หรือ Crossbar ใน Router",
            "Packet ผ่านการ Lookup ที่ Input แล้วต้องข้ามไป Output Port คนละด้าน ส่วนประกอบใดพา Packet ไป?"
          ],
          [
            "Output Buffer",
            "หน่วยความจำที่พักแพ็กเก็ตระหว่างรอส่งออก เมื่อข้อมูลเข้ามาเร็วกว่าที่ส่งออกได้",
            "คิวพอร์ต WAN ช่วงการจราจรหนาแน่น",
            "Datagram เข้าพอร์ตขาออกมากกว่าที่สายส่งได้ชั่วคราว จึงต้องเก็บไว้ในส่วนใด?"
          ],
          [
            "CIDR Prefix",
            "จำนวนบิตด้านหน้าของที่อยู่ IP ที่กำหนดว่าเป็นส่วนเครือข่าย เช่น /24 คือ 24 บิตแรก",
            "10.0.0.0/24 มี Network Prefix 24 บิต",
            "ผู้ดูแลเขียน 172.16.0.0/20 และต้องระบุขอบเขตส่วน Network ข้อมูล /20 หมายถึงอะไร?"
          ],
          [
            "Longest Prefix Match",
            "หากมีหลายเส้นทางตรงกับ IP ปลายทาง ให้เลือกเส้นทางที่มีจำนวนบิตส่วนเครือข่ายตรงกันยาวที่สุด",
            "10.0.1.0/24 ชนะ 10.0.0.0/16 สำหรับ 10.0.1.8",
            "Router มี Route /16 และ /24 ที่ตรงกับปลายทางพร้อมกัน ควรเลือกกฎ Lookup ใดเพื่อส่งต่อ?"
          ]
        ]
      },
      {
        "title": "Datagram, NAT and IPv6",
        "intro": "IPv4 ใช้ที่อยู่ 32 บิต ส่วน IPv6 ใช้ 128 บิต; NAT ช่วยแปลงที่อยู่เมื่ออุปกรณ์ภายในติดต่อเครือข่ายภายนอก",
        "items": [
          [
            "IPv4 Fragmentation",
            "การแบ่งแพ็กเก็ต IPv4 ให้เป็นชิ้นเล็กพอสำหรับขนาดสูงสุดของลิงก์ (MTU) เมื่อจำเป็น",
            "ส่ง Datagram 3000 bytes ผ่าน Link MTU 1500",
            "เราเตอร์พบว่า IPv4 Datagram ใหญ่เกิน MTU และอนุญาตให้แบ่งได้ ควรใช้วิธีใด?"
          ],
          [
            "NAT (Network Address Translation)",
            "วิธีแปลงที่อยู่ IP และอาจแปลงพอร์ต เพื่อให้อุปกรณ์ในเครือข่ายภายในติดต่อเครือข่ายภายนอกได้",
            "หลายเครื่อง LAN แชร์ Public IPv4 เดียว",
            "คอมพิวเตอร์ 20 เครื่องใช้ Private IP แต่เข้าภายนอกผ่าน Public IPv4 เดียว ควรใช้เทคนิคใด?"
          ],
          [
            "IPv6 Address",
            "ที่อยู่เครือข่ายรุ่น IPv6 ยาว 128 บิต เขียนเป็นกลุ่มเลขฐานสิบหกคั่นด้วยเครื่องหมายโคลอน",
            "2001:db8::1",
            "องค์กรต้องมี Address Space มากกว่า IPv4 และกำหนด IP แบบ 128 บิตให้ Interface ควรใช้ที่อยู่ประเภทใด?"
          ],
          [
            "SDN (Software-Defined Networking)",
            "การจัดการเครือข่ายที่แยกส่วนตัดสินใจควบคุมออกจากส่วนส่งต่อข้อมูล ทำให้ตั้งนโยบายจากศูนย์กลางได้",
            "Controller กำหนด Flow Entries ให้ Switch",
            "ศูนย์ข้อมูลอยากปรับนโยบายการส่งต่อจาก Controller กลางแทนตั้งค่าแยกทุกอุปกรณ์ แนวคิดใดเหมาะ?"
          ]
        ]
      }
    ]
  },
  {
    "week": 10,
    "title": "IPv4 Subnetting, IP Forwarding and IPv6",
    "description": "ฝึกแบ่งเครือข่าย IPv4 เป็นซับเน็ต คำนวณ IP กับจำนวนโฮสต์ อ่านตารางส่งต่อ และใช้ที่อยู่ IPv6",
    "source": "writtenWeek10_secพฤหัสเช้าบ่าย.pdf · บันทึก Week 10 (ภาพลายมือ), ร่วมกับ Week 9 Network Layer",
    "groups": [
      {
        "title": "Subnet Calculation",
        "intro": "Subnetting คือการแบ่งหนึ่งเครือข่ายเป็นหลายวงย่อย ต้องแยกส่วน Network และ Host ก่อนคำนวณ Network Address, Broadcast และจำนวนโฮสต์; /31 และ /32 มีข้อยกเว้น",
        "items": [
          [
            "Subnet Mask",
            "ค่าใน IPv4 ที่ใช้แยกบิตส่วนเครือข่าย (บิต 1) ออกจากบิตส่วนโฮสต์ (บิต 0)",
            "/26 = 255.255.255.192",
            "ทีมแยกวง 192.168.1.0/26 และต้องเขียนรูป decimal dotted mask ควรใช้แนวคิดใด?"
          ],
          [
            "Subnetting",
            "การแบ่งเครือข่าย IP เดิมเป็นหลายเครือข่ายย่อย โดยเพิ่มจำนวนบิตที่ใช้ระบุส่วนเครือข่าย",
            "แบ่ง 10.0.1.0/24 ออกเป็นสี่วง /26",
            "มีวง 10.0.1.0/24 และต้องจัดเป็น 4 เครือข่ายแยกกันโดยยืม Host bits วิธีนี้คืออะไร?"
          ],
          [
            "Network Address",
            "ที่อยู่ที่ระบุเครือข่ายย่อย โดยตั้งบิตส่วนโฮสต์เป็น 0 ทั้งหมด",
            "192.168.1.128/25 มี Network Address .128",
            "IP 192.168.1.140/26 ต้องหาค่าที่เป็นจุดเริ่มของ Subnet เดียวกัน ต้องหาชนิด Address ใด?"
          ],
          [
            "Broadcast Address",
            "ที่อยู่ IPv4 สำหรับส่งถึงอุปกรณ์ทุกเครื่องในซับเน็ตเดียวกัน โดยตั้งบิตโฮสต์เป็น 1 ทั้งหมด",
            "192.168.1.0/24 broadcast 192.168.1.255",
            "ให้วง IPv4 /25 และต้องคำนวณที่อยู่สุดท้ายของวงเพื่อส่งถึงทุก Host ควรหาค่าใด?"
          ]
        ]
      },
      {
        "title": "Prefix, Host and Forwarding",
        "intro": "แยกจำนวนเครือข่ายจากจำนวน Host และใช้ Forwarding Table เพื่อเลือก Interface ที่ถูกต้อง",
        "items": [
          [
            "Prefix Length",
            "จำนวนบิตแรกของที่อยู่ IP ที่เป็นส่วนเครือข่าย เช่น /27 หมายถึง 27 บิต",
            "/27 หมายถึง 27 Network Bits",
            "ใน 192.168.10.0/27 ช่างต้องการทราบว่าเหลือ Host bits กี่บิต ต้องเริ่มจากค่าใด?"
          ],
          [
            "Usable Host Addresses",
            "จำนวน IPv4 Address ที่แจกให้อุปกรณ์ใช้งานได้ในซับเน็ตแบบทั่วไป คำนวณจาก 2^(32−prefix)−2 โดย /31 และ /32 มีเงื่อนไขพิเศษ",
            "/27 ใช้งานได้ 30 Host Addresses",
            "ทีมใช้ /27 สำหรับ LAN ปกติที่ต้องไม่นับ Network/Broadcast ค่าที่ต้องคำนวณคืออะไร?"
          ],
          [
            "Forwarding Table",
            "ตารางที่เราเตอร์ใช้ตัดสินใจว่าแพ็กเก็ตปลายทางนี้ควรส่งไปทางพอร์ตใดหรือเราเตอร์ถัดไป",
            "192.168.20.0/24 ส่งทาง eth2",
            "Router ต้องมีข้อมูลว่า Destination Prefix หนึ่งควรออก Interface ใด ควรตรวจโครงสร้างข้อมูลใด?"
          ],
          [
            "Default Route",
            "เส้นทางสำรองที่ใช้เมื่อไม่มีรายการเส้นทางอื่นที่ตรงกับที่อยู่ปลายทางโดยเฉพาะ",
            "0.0.0.0/0 ชี้ไป ISP",
            "Router ไม่พบ Route ที่ตรงกับ IP ปลายทางเฉพาะจึงต้องส่งต่อไป ISP ตามเส้นทางสำรอง ควรใช้ Route แบบใด?"
          ]
        ]
      },
      {
        "title": "IPv6 in Practice",
        "intro": "IPv6 มี Address ยาว 128 บิต ใช้ Prefix และย่อเลขศูนย์ตามกฎ ไม่ใช่แค่เพิ่ม Octet IPv4",
        "items": [
          [
            "IPv6 Compression",
            "การเขียน IPv6 ให้สั้นลง โดยตัดเลขศูนย์นำหน้าแต่ละกลุ่ม และใช้ :: แทนกลุ่มศูนย์ต่อเนื่องได้หนึ่งครั้ง",
            "2001:db8:0:0:0:0:0:1 → 2001:db8::1",
            "ต้องเขียน IPv6 ให้สั้นลงโดยใช้ :: แทนกลุ่มเลข 0 ต่อเนื่องตามกฎเดียวครั้ง ควรใช้เทคนิคใด?"
          ],
          [
            "IPv6 Link-local Address",
            "ที่อยู่ IPv6 สำหรับติดต่ออุปกรณ์ในลิงก์เดียวกัน ใช้ช่วง FE80::/10 และไม่ถูกส่งต่อผ่านเราเตอร์ไปเครือข่ายอื่น",
            "เพื่อนบ้านสื่อสารกันโดยใช้ fe80::...",
            "Interface IPv6 ยังไม่มี Global Address แต่ต้องสื่อสารกับอุปกรณ์บน Link เดียว ควรใช้ Address ประเภทใด?"
          ],
          [
            "IPv6 Unicast",
            "การส่งแพ็กเก็ต IPv6 ไปยังอินเทอร์เฟซปลายทางหนึ่งรายการ",
            "ส่ง Packet ไป 2001:db8::10",
            "Router ส่งข้อมูลจากผู้ส่งรายหนึ่งไปยัง Interface IPv6 ที่ระบุหนึ่งตำแหน่ง ลักษณะการส่งใดเหมาะที่สุด?"
          ],
          [
            "Hop Limit",
            "ค่าจำนวนครั้งสูงสุดที่แพ็กเก็ต IPv6 ผ่านเราเตอร์ได้ โดยลดลงครั้งละ 1 ทุกครั้งที่ผ่านเราเตอร์",
            "Packet มี Hop Limit 3 แล้วผ่าน Router สองตัวเหลือ 1",
            "ต้องป้องกัน IPv6 Packet วิ่งวนไม่สิ้นสุด จึงใส่ตัวนับลดทุกครั้งที่ผ่าน Router ฟิลด์นี้คืออะไร?"
          ]
        ]
      }
    ]
  },
  {
    "week": 11,
    "title": "Link Layer Part 1: MAC and ARP",
    "description": "Encapsulation, MAC Address, Ethernet, Unicast/Broadcast และ ARP",
    "source": "Week-11 Link Layer part 1 handout.pdf",
    "groups": [
      {
        "title": "Link Layer and Frame",
        "intro": "Layer 2 ส่ง Frame ข้าม Link ทีละ Hop โดย IP ปลายทางคงเดิม แต่ MAC ที่ใช้ข้าม Link เปลี่ยนได้",
        "items": [
          [
            "Data Link Layer",
            "ชั้นสื่อสาร Frame ข้ามลิงก์ระหว่างอุปกรณ์ที่เชื่อมต่อกันโดยตรง",
            "Ethernet ส่งจาก PC ไป Switch",
            "เมื่อ Router ส่ง Datagram ผ่าน Ethernet Link ต่อไป ต้องใช้ชั้นใดห่อ Datagram เป็น Frame?"
          ],
          [
            "Ethernet Frame",
            "หน่วยข้อมูล Layer 2 ที่มี Source/Destination MAC และ FCS",
            "Destination MAC เป็นค่าของ Gateway",
            "ก่อนส่ง IP Packet ผ่าน Ethernet NIC ต้องจัดส่วนหัว MAC และส่วนท้ายตรวจสอบให้อยู่ในหน่วยใด?"
          ],
          [
            "MAC Address",
            "ที่อยู่ Layer 2 ใช้ระบุอุปกรณ์/Interface ภายในลิงก์หรือ LAN",
            "00:1A:2B:3C:4D:5E",
            "Laptop ส่ง Frame ถึง Default Gateway ใน LAN โดยใช้ที่อยู่ 48 บิตของ NIC ที่ Layer 2 ควรใช้ข้อมูลใด?"
          ],
          [
            "IP Address",
            "ที่อยู่ Layer 3 ใช้ระบุ Interface และส่งข้อมูลข้ามเครือข่าย",
            "192.168.10.9",
            "เมื่อ Router ส่ง Frame ข้ามหลาย Link แล้ว MAC Header เปลี่ยน แต่ที่อยู่ปลายทาง Layer 3 ยังระบุ Host เดิม สิ่งนั้นคืออะไร?"
          ]
        ]
      },
      {
        "title": "Unicast, Broadcast and ARP",
        "intro": "MAC แต่ละชนิดมีขอบเขตการรับที่ต่างกัน และ ARP ช่วยหา MAC จาก IPv4 บน LAN",
        "items": [
          [
            "Unicast Frame",
            "Frame ที่ระบุ MAC ปลายทางแบบตัวเดียว",
            "ส่ง Frame ไป MAC ของเครื่อง B",
            "PC ต้องส่งข้อมูล Layer 2 ให้ NIC ที่ระบุเครื่องเดียว ไม่ใช่ทุกเครื่องในวง ควรใช้ Frame ชนิดใด?"
          ],
          [
            "Broadcast Frame",
            "Frame ที่ใช้ Destination MAC FF:FF:FF:FF:FF:FF ถึงทุกเครื่องใน Broadcast Domain",
            "ARP Request แพร่ถึงทุก Host ใน VLAN",
            "PC ยังไม่ทราบ MAC ของ Gateway จึงส่ง Frame ให้ทุกเครื่องใน LAN รับพร้อมกัน ต้องใช้ Frame แบบใด?"
          ],
          [
            "ARP (Address Resolution Protocol)",
            "วิธีถามว่า IPv4 Address นี้ใช้ MAC Address อะไร เพื่อส่งเฟรมไปยังอุปกรณ์ที่อยู่บนลิงก์เดียวกัน",
            "ARP หา MAC ของ 192.168.1.1",
            "คอมพิวเตอร์ทราบ IPv4 ของ Gateway แต่ไม่ทราบ MAC สำหรับส่ง Frame ขั้นต่อไปต้องใช้โปรโตคอลใด?"
          ],
          [
            "ARP Cache",
            "ตารางเก็บคู่ IPv4 Address และ MAC Address ที่เพิ่งค้นพบ เพื่อไม่ต้องถามซ้ำทุกครั้ง",
            "arp -a แสดง MAC ของ Gateway",
            "Host เคยถาม MAC ของ IP ใน LAN แล้วและต้องการนำค่ากลับมาใช้ทันที ควรค้นจากโครงสร้างใด?"
          ]
        ]
      },
      {
        "title": "Across Networks",
        "intro": "เมื่อส่งไปต่าง Subnet ต้องใช้ Next-hop MAC ของ Gateway ไม่ใช่ MAC ปลายทางต่างเครือข่าย",
        "items": [
          [
            "Default Gateway",
            "Router/Interface ที่ Host ส่ง Packet ไปเมื่อ Destination อยู่ต่าง Subnet",
            "PC ส่ง Frame ถึง MAC Router โดย IP ปลายทางยังเป็น Server",
            "PC จะเปิดเว็บเซิร์ฟเวอร์ที่อยู่อีกเครือข่าย แต่ MAC ของ Server ไม่อยู่ใน LAN สิ่งใดควรเป็น Next Hop?"
          ],
          [
            "Next-hop MAC",
            "ที่อยู่ Layer 2 ของอุปกรณ์ถัดไปใน Link ปัจจุบัน",
            "MAC ของ Router ฝั่งออกจากเครือข่าย",
            "ระหว่างส่ง IP ถึงปลายทางนอก LAN ควรใส่ MAC ใครใน Ethernet Header ของ Link แรก?"
          ],
          [
            "Encapsulation",
            "การห่อข้อมูลชั้นบนด้วย Header/Trailer ของแต่ละชั้น",
            "IP Datagram ถูกห่อด้วย Ethernet Header และ FCS",
            "ก่อนส่งบนสาย LAN NIC เพิ่ม MAC Header รอบ Datagram กระบวนการนี้คืออะไร?"
          ],
          [
            "Multicast MAC",
            "ที่อยู่ MAC ปลายทางแบบกลุ่ม (Layer 2) ที่ใช้กับ Ethernet Frame เพื่อส่งข้อมูลหนึ่งชุดถึงกลุ่มผู้รับที่สนใจ เช่น กลุ่ม IPv4/IPv6 Multicast ไม่ใช่ MAC ของเครื่องใดเครื่องหนึ่ง และต่างจาก Broadcast ที่ส่งถึงทั้งวง",
            "ตัวอย่าง IPv4 กลุ่ม 239.1.1.1 → MAC 01:00:5E:01:01:01; IPv6 กลุ่ม ff02::1 → 33:33:00:00:00:01 สวิตช์อาจใช้ IGMP/MLD Snooping เพื่อเลือกพอร์ตผู้รับ มิฉะนั้นอาจ Flood ภายใน VLAN",
            "ระบบต้องการส่ง Ethernet Frame หนึ่งชุดไปยังกลุ่มอุปกรณ์ที่สมัครรับ เช่น กลุ่ม 239.1.1.1 แทนการส่งให้เครื่องเดียวหรือ Broadcast ทุกเครื่อง ต้องใช้ MAC Address ปลายทางชนิดใด?"
          ]
        ]
      }
    ]
  },
  {
    "week": 12,
    "title": "Link Layer Part 2: Framing and Error Detection",
    "description": "Byte/Bit Stuffing, Parity, Checksum และ CRC พร้อมโจทย์คำนวณ",
    "source": "Week-12 Link Layer part 2 handout.pdf",
    "groups": [
      {
        "title": "Framing Mechanisms",
        "intro": "การส่งบิตต่อเนื่องต้องมีขอบเขต Frame และหลีกเลี่ยงรูปแบบ Flag ที่ซ้ำกับข้อมูล",
        "items": [
          [
            "Framing",
            "การกำหนดจุดเริ่มและสิ้นสุดของ Frame จาก Bit Stream",
            "อ่าน Preamble เพื่อหาจุดเริ่ม Ethernet Frame",
            "ผู้รับเห็นบิตไหลต่อเนื่องและต้องแยกว่าข้อมูลชุดหนึ่งเริ่ม/จบตรงไหน ควรใช้กระบวนการใด?"
          ],
          [
            "Byte Stuffing",
            "การแทรก Escape Byte เมื่อ Payload มีค่า Byte ตรงกับ Flag ที่ใช้แบ่ง Frame",
            "PPP Escape ค่า 0x7E เป็น 0x7D 0x5E",
            "ข้อมูลที่จะส่งมีค่า 0x7E ซึ่งชนกับ Flag ของ PPP จึงต้องแทรก Byte พิเศษเพื่อไม่ให้ผู้รับเข้าใจผิด วิธีนี้คืออะไร?"
          ],
          [
            "Bit Stuffing",
            "การเพิ่มบิตตามกฎเมื่อเจอ Pattern ที่คล้าย Flag ใน Payload",
            "แทรก 0 หลังเจอ 1 ต่อเนื่องห้าตัว",
            "Link ใช้ Flag 01111110 แต่ Payload มีเลข 1 ติดกัน 5 ตัว จึงแทรก 0 เพื่อไม่ให้เหมือน Flag ต้องใช้เทคนิคใด?"
          ],
          [
            "Preamble",
            "บิตรูปแบบต้น Frame สำหรับช่วย Sync สัญญาณ/เตรียมการรับ",
            "Ethernet Preamble ก่อน SFD",
            "Receiver ต้องปรับจังหวะรับบิตก่อนอ่าน Ethernet Frame จริง ควรอาศัยส่วนใดที่มาก่อน SFD?"
          ]
        ]
      },
      {
        "title": "Parity and Checksum",
        "intro": "Parity และ Internet Checksum ใช้ตรวจ error โดยมีข้อจำกัดต่างกัน",
        "items": [
          [
            "Even Parity",
            "บิตตรวจที่ทำให้จำนวนบิต 1 ทั้งหมดเป็นจำนวนคู่",
            "ข้อมูล 1011 มี 1 สามตัวจึงเพิ่ม Parity=1",
            "Sender ส่ง 1011 ซึ่งมีบิต 1 จำนวน 3 บิต และต้องส่งแบบ Even Parity ควรเลือกกฎตรวจใด?"
          ],
          [
            "Two-dimensional Parity",
            "การใส่ Parity ทั้งแถวและคอลัมน์เพื่อช่วยชี้ตำแหน่งบิตผิด",
            "หนึ่งบิตกลับค่าทำให้ Row และ Column Parity ผิดพร้อมกัน",
            "ตารางบิตรับมาแล้วพบแถว 2 และคอลัมน์ 3 ผิดเพียงจุดเดียว จึงหาตำแหน่งบิตผิดด้วยวิธีใด?"
          ],
          [
            "Internet Checksum",
            "การบวกคำข้อมูลแบบ One's Complement แล้วกลับบิตเพื่อใช้ตรวจข้อผิดพลาด",
            "ตรวจ TCP/UDP Header และ Payload ตามกฎ Checksum",
            "ระบบรวมคำข้อมูล 16 บิตแล้วทำ One's Complement เพื่อสร้างค่าตรวจสอบ ใช้วิธีใด?"
          ],
          [
            "Error Detection",
            "การพิจารณาว่าข้อมูลที่รับอาจผิดพลาด โดยไม่จำเป็นต้องแก้บิตเอง",
            "Frame มี CRC ไม่ตรงจึงถูก Drop",
            "Ethernet NIC ตรวจพบว่า Frame เสียหายแล้วทิ้ง ไม่ได้คำนวณแก้ค่าบิตให้ถูก หน้าที่นี้คืออะไร?"
          ]
        ]
      },
      {
        "title": "CRC and Reliability",
        "intro": "CRC ตรวจข้อผิดพลาดด้วยการหารพหุนามทวิภาค; Link ต่างชนิดตอบสนองต่อ Frame Error ไม่เหมือนกัน",
        "items": [
          [
            "CRC (Cyclic Redundancy Check)",
            "วิธีตรวจความผิดพลาดของข้อมูล โดยคำนวณเศษจากการหารข้อมูลด้วยพหุนามที่ตกลงกันไว้",
            "หาร Data Bits แล้วแนบ Remainder ที่ท้าย Frame",
            "Ethernet ต้องสร้างค่าตรวจจับ Burst Error ที่ท้าย Frame ด้วยการหารแบบ XOR ควรใช้วิธีใด?"
          ],
          [
            "Generator Polynomial",
            "พหุนาม/รูปแบบบิตที่ใช้เป็นตัวหารสำหรับการคำนวณ CRC",
            "ใช้ G=1011 เพื่อสร้าง CRC",
            "แบบฝึกหัดกำหนด G=1011 แล้วให้หาร Dataword เพื่อหาระเบียนเศษ ค่าของ G มีบทบาทใด?"
          ],
          [
            "CRC Remainder",
            "เศษจากการหาร modulo-2 ใช้แนบข้อมูลและตรวจภายหลัง",
            "หารแบบ XOR แล้วได้เศษ 011",
            "Sender คำนวณ XOR Division แล้วได้บิตเศษที่ต้องใส่ท้าย Dataword ควรเรียกค่านี้ว่าอะไร?"
          ],
          [
            "Burst Error",
            "ความผิดพลาดที่กระทบช่วงของบิตหลายตำแหน่งติดต่อกัน",
            "สัญญาณรบกวนทำให้บิตใน Frame ช่วงหนึ่งผิดหลายตัว",
            "สัญญาณรบกวนช่วงสั้นทำให้กลุ่มบิตต่อเนื่องหลายตำแหน่งผิดไปพร้อมกัน ควรจัดเป็นความผิดพลาดชนิดใด?"
          ]
        ]
      }
    ]
  },
  {
    "week": 13,
    "title": "Link Layer Part 3: Multiple Access and Switching",
    "description": "ALOHA, CSMA/CD, Ethernet Switching, VLAN และ Wi-Fi",
    "source": "Week-13 Link Layer part 3 handout.pdf",
    "groups": [
      {
        "title": "Multiple Access Protocols",
        "intro": "หลาย Station ใช้ Channel เดียว ต้องจัดสรรเวลาและลดการ Collision ตามชนิดสื่อ",
        "items": [
          [
            "ALOHA",
            "วิธีส่งข้อมูลลง Shared Channel เมื่อมีข้อมูล โดย Collision ทำให้ต้องส่งซ้ำ",
            "Pure ALOHA ส่งได้ทันทีโดยไม่ตรวจช่องก่อน",
            "หลายสถานีใช้ช่องวิทยุเดียวกันและส่งทันทีเมื่อมีข้อมูลแม้อาจชนกัน ใช้แนวคิดโปรโตคอลใด?"
          ],
          [
            "CSMA (Carrier Sense Multiple Access)",
            "กลไกฟังสื่อว่ามีผู้อื่นกำลังส่งหรือไม่ก่อนส่งข้อมูล",
            "Host รอเมื่อสื่อไม่ว่าง",
            "เครื่องปลายทางตรวจ Shared Medium ก่อนเริ่มส่งเพื่อลดโอกาสชนกัน ควรใช้หลักการใด?"
          ],
          [
            "CSMA/CD",
            "ฟังสื่อและตรวจพบ Collision ระหว่างส่งใน Shared Ethernet แบบ Half Duplex",
            "Hub Ethernet เก่าตรวจชนแล้วหยุดส่ง",
            "เครือข่าย Ethernet ผ่าน Hub ต้องหยุดเมื่อพบ Collision แล้วสุ่มรอส่งใหม่ ควรใช้กลไกใด?"
          ],
          [
            "Binary Exponential Backoff",
            "การสุ่มช่วงรอเพิ่มตามจำนวน Collision เพื่อไม่ให้ผู้ส่งชนซ้ำทันที",
            "Collision ครั้งถัดไปเลือกจากหน้าต่างเวลาที่โตขึ้น",
            "สองเครื่องชนกันซ้ำและต้องสุ่มหน่วงเวลาโดยขยายช่วงสุ่มเมื่อชนบ่อย ควรใช้อัลกอริทึมใด?"
          ]
        ]
      },
      {
        "title": "Ethernet Switches and Domains",
        "intro": "Switch เรียนรู้ Source MAC แล้วส่งไป Destination Port, ลด Collision Domains และกำหนด Broadcast Domains ด้วย VLAN",
        "items": [
          [
            "MAC Learning",
            "สวิตช์บันทึก Source MAC และ Input Port ลงตารางเมื่อรับ Frame",
            "เรียนรู้ว่า A อยู่ port 2",
            "Switch รับ Frame จาก Host A ทาง port 2 แล้วเพิ่มรายการ A→2 ในตารางเอง กลไกนี้คืออะไร?"
          ],
          [
            "Unknown Unicast Flooding",
            "สวิตช์กระจาย Frame ไปพอร์ตอื่นใน VLAN เมื่อไม่รู้พอร์ตของ MAC ปลายทาง",
            "ยังไม่เคยเรียนรู้ MAC B",
            "Switch รับ Frame ถึง MAC ที่ไม่มีในตารางและส่งออกพอร์ตอื่นใน VLAN ยกเว้นพอร์ตขาเข้า พฤติกรรมนี้คืออะไร?"
          ],
          [
            "Collision Domain",
            "ขอบเขตที่อุปกรณ์บนสื่อร่วมกันอาจเกิด Collision",
            "แต่ละพอร์ต Switch แบบ Full Duplex แยก Collision Domain",
            "ผู้ออกแบบต้องนับขอบเขตที่การส่งสองเครื่องอาจชนกันบน Shared Medium หน่วยพื้นที่นั้นคืออะไร?"
          ],
          [
            "VLAN (Virtual LAN)",
            "การแบ่งกลุ่มเครือข่าย Layer 2 เชิงตรรกะให้แยก Broadcast Domains",
            "VLAN10 ฝ่ายบุคคล VLAN20 ฝ่ายบัญชี",
            "สวิตช์เดียวให้สองแผนกไม่รับ Broadcast ของกันและกันโดยตั้ง VLAN ควรใช้คุณสมบัติใด?"
          ]
        ]
      },
      {
        "title": "Wi-Fi and Access Control",
        "intro": "Wireless ไม่สามารถตรวจ Collision ระหว่างส่งได้เหมือน Ethernet แบบสาย จึงเน้นหลีกเลี่ยงการชน",
        "items": [
          [
            "CSMA/CA",
            "วิธีลดโอกาสที่อุปกรณ์ส่งข้อมูลชนกันในเครือข่ายไร้สาย โดยฟังช่องสัญญาณและสุ่มรอก่อนส่ง",
            "Wi-Fi ใช้สุ่ม Backoff ก่อนส่ง Frame",
            "หลายโทรศัพท์ใช้ AP เดียวกัน จึงต้องหลีกเลี่ยงการชนแทนการตรวจจับขณะส่ง ควรใช้โปรโตคอลใด?"
          ],
          [
            "Hidden Terminal Problem",
            "สองสถานีไม่ได้ยินกันแต่ส่งชนกันที่ตัวรับร่วม",
            "A และ C อยู่คนละมุม แต่ต่างส่งให้ AP B",
            "โทรศัพท์ A และ C ฟังกันไม่ถึง แต่ทั้งคู่ส่งถึง AP เดียวกันและอาจชน สถานการณ์นี้เรียกว่าอะไร?"
          ],
          [
            "RTS/CTS",
            "กลไกขอส่งและอนุญาตส่งก่อนส่งข้อมูล ช่วยลดปัญหา Hidden Terminals บางกรณี",
            "Station ส่ง RTS แล้ว AP ตอบ CTS",
            "AP ต้องช่วยประกาศสิทธิ์ใช้ช่องทางก่อนส่ง Data ขนาดใหญ่เพื่อลด Hidden Terminal ควรใช้กลไกใด?"
          ],
          [
            "802.11 Wi-Fi",
            "กลุ่มมาตรฐาน Wireless LAN สำหรับการสื่อสารผ่านคลื่นวิทยุ",
            "โน้ตบุ๊กเชื่อม Access Point ด้วย Wi-Fi",
            "บริษัทติดตั้ง Access Point เพื่อให้ Notebook ติดต่อเครือข่ายผ่าน Wireless LAN ตามมาตรฐานใด?"
          ]
        ]
      }
    ]
  }
]);
