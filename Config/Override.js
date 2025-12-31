// 参考 Verge Rev 示例 Script 配置
//
// Clash Verge Rev (Version ≥ 17.2) & Mihomo-Party (Version ≥ 1.5.10)

// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "text",
  "interval": 86400
};

// 策略组通用配置
const groupBaseOption = {
  "interval": 300,
  "url": "http://www.gstatic.com/generate_204",
  "max-failed-times": 3,
  "exclude-filter": "流量|重置|到期|官网|网址|文档",
};

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖通用配置
  config["mixed-port"] = "7890";
  config["tcp-concurrent"] = true;
  config["allow-lan"] = true;
  config["ipv6"] = false;
  config["log-level"] = "info";
  config["unified-delay"] = "true";
  config["find-process-mode"] = "strict";
  config["global-client-fingerprint"] = "chrome";

  // 覆盖 dns 配置
  config["dns"] = {
    "enable": true,
    "listen": "0.0.0.0:1053",
    "ipv6": false,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter": ['+.lan', '*', '+.local', '+.cmpassport.com', 'id6.me', 'open.e.189.cn', 'mdn.open.wo.cn', 'opencloud.wostore.cn', 'auth.wosms.cn', '+.10099.com.cn', '+.msftconnecttest.com', '+.msftncsi.com', 'lancache.steamcontent.com'],
    "nameserver": ["223.5.5.5", "119.29.29.29"]
  };

  // 覆盖 geodata 配置
  config["geodata-mode"] = true;
  config["geox-url"] = {
    "geoip": "https://git.repcz.link/raw.githubusercontent.com/Loyalsoldier/geoip/release/geoip.dat",
    "geosite": "https://git.repcz.link/github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
    "mmdb": "https://git.repcz.link/raw.githubusercontent.com/Loyalsoldier/geoip/release/Country.mmdb",
    "asn": "https://git.repcz.link/raw.githubusercontent.com/Loyalsoldier/geoip/release/GeoLite2-ASN.mmdb"
  };

  // 覆盖 sniffer 配置
  config["sniffer"] = {
    "enable": true,
    "parse-pure-ip": true,
    "sniff": {
      "TLS": {
        "ports": ["443", "8443"]
      },
      "HTTP": {
        "ports": ["80", "8080-8880"],
        "override-destination": true
      },
      "QUIC": {
        "ports": ["443", "8443"]
      }
    }
  };

  // 覆盖 tun 配置
  config["tun"] = {
    "enable": true,
    "stack": "mixed",
    "dns-hijack": ["any:53"]
  };

  // 覆盖策略组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "节点选择",
      "type": "select",
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Rocket.png"
    },
    {
      ...groupBaseOption,
      "name": "特殊节点",
      "type": "select",
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Star.png"
    },
    {
      ...groupBaseOption,
      "name": "Emby",
      "type": "select",
      "proxies": ["DIRECT","节点选择", "特殊节点", "香港节点", "台湾节点", "日本节点","狮城节点","美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Emby.png"
    },
    {
      ...groupBaseOption,
      "name": "云盘服务",
      "type": "select",
      "proxies": ["DIRECT","节点选择", "特殊节点", "香港节点", "台湾节点", "日本节点","狮城节点","美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/iCloud.png"
    },
    {
      ...groupBaseOption,
      "name": "电报消息",
      "type": "select",
      "proxies": ["DIRECT","节点选择", "特殊节点", "香港节点", "台湾节点", "日本节点","狮城节点","美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Telegram.png"
    },
    {
      ...groupBaseOption,
      "name": "推特消息",
      "type": "select",
      "proxies": ["DIRECT","节点选择", "特殊节点", "香港节点", "台湾节点", "日本节点","狮城节点","美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Twitter.png"
    },
    {
      ...groupBaseOption,
      "name": "AI",
      "type": "select",
      "proxies": ["DIRECT","节点选择", "特殊节点", "香港节点", "台湾节点", "日本节点","狮城节点","美国节点"],
      "icon": "https://raw.githubusercontent.com/Orz-3/mini/master/Color/OpenAI.png"
    },
    {
      ...groupBaseOption,
      "name": "游戏平台",
      "type": "select",
      "proxies": ["DIRECT","节点选择", "特殊节点", "香港节点", "台湾节点", "日本节点","狮城节点","美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Game.png"
    },
    {
      ...groupBaseOption,
      "name": "哔哩哔哩",
      "type": "select",
      "proxies": ["DIRECT","节点选择", "特殊节点", "香港节点", "台湾节点", "日本节点","狮城节点","美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/bilibili.png"
    },
    {
      ...groupBaseOption,
      "name": "巴哈姆特",
      "type": "select",
      "proxies": ["DIRECT","节点选择", "特殊节点", "香港节点", "台湾节点", "日本节点","狮城节点","美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Bahamut.png"
    },
    {
      ...groupBaseOption,
      "name": "谷歌服务",
      "type": "select",
      "proxies": ["DIRECT","节点选择", "特殊节点", "香港节点", "台湾节点", "日本节点","狮城节点","美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Google_Search.png"
    },
    {
      ...groupBaseOption,
      "name": "微软服务",
      "type": "select",
      "proxies": ["DIRECT","节点选择", "特殊节点", "香港节点", "台湾节点", "日本节点","狮城节点","美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Microsoft.png"
    },
    {
      ...groupBaseOption,
      "name": "仅限日本",
      "type": "select",
      "proxies": ["DIRECT","节点选择", "特殊节点", "香港节点", "台湾节点", "日本节点","狮城节点","美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/JP.png"
    },
    {
      ...groupBaseOption,
      "name": "排除日本",
      "type": "select",
      "proxies": ["DIRECT","节点选择", "特殊节点", "香港节点", "台湾节点", "日本节点","狮城节点","美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Reject.png"
    },
    {
      ...groupBaseOption,
      "name": "兜底分流",
      "type": "select",
      "proxies": ["DIRECT","节点选择", "特殊节点", "香港节点", "台湾节点", "日本节点","狮城节点","美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Final.png"
    },
    // 地区分组
    {
      ...groupBaseOption,
      "name": "香港节点",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇭🇰|香港|(\b(HK|Hong)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Hong_Kong.png"
    },
    {
      ...groupBaseOption,
      "name": "台湾节点",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇨🇳|🇹🇼|台湾|(\b(TW|Tai|Taiwan)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Taiwan.png"
    },
    {
      ...groupBaseOption,
      "name": "日本节点",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇯🇵|日本|东京|(\b(JP|Japan)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Japan.png"
    },
    {
      ...groupBaseOption,
      "name": "狮城节点",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇸🇬|新加坡|狮|(\b(SG|Singapore)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Singapore.png"
    },
    {
      ...groupBaseOption,
      "name": "美国节点",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇺🇸|美国|洛杉矶|圣何塞|(\b(US|United States)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/United_States.png"
    },
  ];

  // 覆盖规则集
  config["rule-providers"] = {
    "Direct": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Sofzya/Clash/raw/main/Rules/Direct.list"
    },
    "CloudDrive": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Sofzya/Clash/raw/main/Rules/CloudDrive.list"
    },
    "MEGA": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/blackmatrix7/ios_rule_script/raw/master/rule/Clash/MEGA/MEGA.list"
    },
    "OutJP": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Sofzya/Clash/raw/main/Rules/OutJP.list"
    },
    "OnlyJP": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Sofzya/Clash/raw/main/Rules/OnlyJP.list"
    },
    "Proxy": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Sofzya/Clash/raw/main/Rules/Proxy.list"
    },
    "Emby": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Emby.list"
    },
    "MoreEmby": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Sofzya/Clash/raw/main/Rules/MoreEmby.list"
    },
    "Telegram": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Telegram.list"
    },
    "Twitter": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Twitter.list"
    },
    "Cici": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Sofzya/Clash/raw/main/Rules/Cici.list"
    },
    "AI": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/AI.list"
    },
    "Steam": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Steam.list"
    },
    "Epic": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Epic.list"
    },
    "BiliBili": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Bilibili.listt"
    },
    "Bahamut": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Bahamut.list"
    },
    "YouTube": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/YouTube.list"
    },
    "Google": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Google.list"
    },
    "Github": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Github.list"
    },
    "OneDrive": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/OneDrive.list"
    },
    "Microsoft": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Microsoft.list"
    },
    "Lan": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Lan.list"
    }
  };

  // 覆盖规则
  config["rules"] = [
    "RULE-SET,Direct,DIRECT",
    "RULE-SET,CloudDrive,云盘服务",
    "RULE-SET,MEGA,云盘服务",
    "RULE-SET,OutJP,排除日本",
    "RULE-SET,OnlyJP,仅限日本",
    "RULE-SET,Proxy,节点选择",
    "RULE-SET,Emby,Emby",
    "RULE-SET,MoreEmby,Emby",
    "RULE-SET,Telegram,电报消息",
    "RULE-SET,Twitter,推特消息",
    "RULE-SET,Cici,AI",
    "RULE-SET,AI,AI",
    "RULE-SET,Steam,游戏平台",
    "RULE-SET,Epic,游戏平台",
    "RULE-SET,BiliBili,哔哩哔哩",
    "RULE-SET,Bahamut,巴哈姆特",
    "RULE-SET,YouTube,谷歌服务",
    "RULE-SET,Google,谷歌服务",
    "RULE-SET,Github,微软服务",
    "RULE-SET,OneDrive,微软服务",
    "RULE-SET,Microsoft,微软服务",
    "RULE-SET,Lan,DIRECT",
    "GEOIP,CN,DIRECT",
    "MATCH,兜底分流"
  ];

  // 返回修改后的配置
  return config;
}
