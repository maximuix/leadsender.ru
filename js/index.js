let mobile = false;

$(document).ready(function () {
    mobile = $(window).width() < 700;
});

function renderUptimeDay(date, uptime, logs) {
    let color = '#3BD671';
    let color99 = '#9deab8';
    let color80 = '#f29030';
    let color0 = '#687790';
    if (parseFloat(uptime) < 100.00)
        color = color99;
    if (parseFloat(uptime) < 80.00)
        color = color80;
    if (parseFloat(uptime) === 0.00)
        color = color0;
    let logsText = '';
    if (logs)
        for (let i = 0; i < logs.length; i++) {
            logsText += `<br>${logs[i].result}`;
        }
    return `<div class="uptime_day_status" style="background-color: ${color};">
                        <div class="uptime_day_hover_element">
                            <div style="background: rgba(0,0,0,0.68); color: #fff; border-radius: 6px; font-size: 10px; padding: 5px; font-style: normal;
                                font-weight: 400;">${date}<br>${uptime}%<br>${logsText}
                            </div>
                            <div style="margin: 0 auto; border: 10px solid rgba(64,224,208,0); border-top: 10px solid rgba(0,0,0,0.68); width: 3px;"></div>
                        </div>
                    </div>`;
}

function renderUptimeServer(name, uptime, status, days = []) {
    let childs = ``;
    console.log('========================')
    for (let i = mobile ? 60 : 0; i < days.length; i++) {
        console.log(days[i].uptime);
        childs += renderUptimeDay(days[i].date, days[i].uptime, days[i].logs);
    }
    return `<div class="uptime_server">
                <div class="d-flex" style="justify-content: space-between;">
                    <div class="d-flex">
                        <div class="uptime_elem_title" style="">
                            ${name.toUpperCase()}
                        </div>
                        <div style="margin: auto 10px;">
                            <img src="img/icons/Arrow_right_light1.svg" alt="">
                        </div>
                        <div style="width: 1.3px; height: 24px;background: #808080;border-radius: 2px;margin: auto 0;">
                        </div>
                        <div class="uptime_elem_interest" style="color: #3BD671; font-weight: 400; font-size: 20px; line-height: 130%; margin: auto 8px;">
                            ${uptime}%
                        </div>
                    </div>
                    <div class="d-flex">
                        <div style="margin: auto 0;">
                            <span class="pulse"></span>
                        </div>
                        <div style="margin: auto 0; margin-left: 8px;">
                            <h4 class="uptime_elem_status" style="
                                font-style: normal;
                                font-weight: 400;
                                font-size: 20px;
                                line-height: 130%;
                                color: #3BD671;">
                                ${status}
                            </h4>
                        </div>
                    </div>
                </div>
                <div class="d-flex" style="margin-top:24px;">
                    ${childs}
                </div>
            </div>`;
}

function loadUptime() {
    let html = renderUptimeServer('AMOCRM GATEWAY', 100.00, "Доступен");
    html += renderUptimeServer('API SERVER', 99.983, "Доступен");
    html += renderUptimeServer('TELEGRAM SERVER', 100.00, "Доступен");
    html += renderUptimeServer('WHATSAPP SERVER', 99.605, "Доступен");
    document.getElementById('uptime_body').innerHTML = html;
    fetch('https://api.leadsender.ru/uptime')
        .then(response => response.json())
        .then(result => {
            console.log(result)
            html = '';
            let monitors = result.monitors.reverse();
            for (let i = 0; i < monitors.length; i++) {
                let monitor = monitors[i];
                html += renderUptimeServer(monitor.name, monitor.uptime, monitor.status, monitor.days.reverse());
            }
            document.getElementById('uptime_body').innerHTML = html;
        })
        .catch(error => {
            console.log('error', error)
        });
}

let example_php = hljs.highlightAuto("<?php\n" +
    "\n" +
    "$curl = curl_init();\n" +
    "\n" +
    "curl_setopt_array($curl, array(\n" +
    "  CURLOPT_URL => 'https://api.leadsender.ru/api/alpha/accounts/991554717765/channels/whatsapp/12327382450/dialogs/924554717765',\n" +
    "  CURLOPT_RETURNTRANSFER => true,\n" +
    "  CURLOPT_ENCODING => '',\n" +
    "  CURLOPT_MAXREDIRS => 10,\n" +
    "  CURLOPT_TIMEOUT => 0,\n" +
    "  CURLOPT_FOLLOWLOCATION => true,\n" +
    "  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,\n" +
    "  CURLOPT_CUSTOMREQUEST => 'POST',\n" +
    "  CURLOPT_POSTFIELDS =>'{\n" +
    "    \"type\": \"image\",\n" +
    "    \"body\": \"Здравствуй, как твои дела?\",\n" +
    "    \"media\": \"https://leadsender.ru/img/intro-bg.png\"\n" +
    "}',\n" +
    "  CURLOPT_HTTPHEADER => array(\n" +
    "    'Authorization: Bearer 8e4c8f20113c5d98fc4e16b8dbc8f0f1',\n" +
    "    'Content-Type: application/json'\n" +
    "  ),\n" +
    "));\n" +
    "\n" +
    "$response = curl_exec($curl);\n" +
    "\n" +
    "curl_close($curl);\n" +
    "echo $response;").value;

let example_js = hljs.highlightAuto("var myHeaders = new Headers();\n" +
    "myHeaders.append(\"Authorization\", \"Bearer 8e4c8f30113c5d98fc4e16b8dbc8f0f1\");\n" +
    "myHeaders.append(\"Content-Type\", \"application/json\");\n" +
    "\n" +
    "var raw = JSON.stringify({\n" +
    "  \"type\": \"image\",\n" +
    "  \"body\": \"Здравствуй, как твои дела?\",\n" +
    "  \"media\": \"https://leadsender.ru/img/intro-bg.png\"\n" +
    "});\n" +
    "\n" +
    "var requestOptions = {\n" +
    "  method: 'POST',\n" +
    "  headers: myHeaders,\n" +
    "  body: raw,\n" +
    "  redirect: 'manual'\n" +
    "};\n" +
    "\n" +
    "fetch(\"https://api.leadsender.ru/api/alpha/accounts/994524717765/channels/whatsapp/12347382450/dialogs/994514717765\", requestOptions)\n" +
    "  .then(response => response.text())\n" +
    "  .then(result => console.log(result))\n" +
    "  .catch(error => console.log('error', error));").value;

let example_nodejs = hljs.highlightAuto("var axios = require('axios');\n" +
    "var data = JSON.stringify({\n" +
    "  \"type\": \"image\",\n" +
    "  \"body\": \"Здравствуй, как твои дела?\",\n" +
    "  \"media\": \"https://leadsender.ru/img/intro-bg.png\"\n" +
    "});\n" +
    "\n" +
    "var config = {\n" +
    "  method: 'post',\n" +
    "  url: 'https://api.leadsender.ru/api/alpha/accounts/994554717765/channels/whatsapp/12317382450/dialogs/994554717765',\n" +
    "  headers: { \n" +
    "    'Authorization': 'Bearer 8e4c8f30113c5d98fc4e16b8dbc8f0f1', \n" +
    "    'Content-Type': 'application/json'\n" +
    "  },\n" +
    "  data : data\n" +
    "};\n" +
    "\n" +
    "axios(config)\n" +
    ".then(function (response) {\n" +
    "  console.log(JSON.stringify(response.data));\n" +
    "})\n" +
    ".catch(function (error) {\n" +
    "  console.log(error);\n" +
    "});").value;

let example_python = hljs.highlightAuto("import requests\n" +
    "import json\n" +
    "\n" +
    "url = \"https://api.leadsender.ru/api/alpha/accounts/994554717765/channels/whatsapp/12317382450/dialogs/994554717765\"\n" +
    "\n" +
    "payload = json.dumps({\n" +
    "  \"type\": \"image\",\n" +
    "  \"body\": \"Здравствуй, как твои дела?\",\n" +
    "  \"media\": \"https://leadsender.ru/img/intro-bg.png\"\n" +
    "})\n" +
    "headers = {\n" +
    "  'Authorization': 'Bearer 8e4c8f30113c5d98fc4e16b8dbc8f0f1',\n" +
    "  'Content-Type': 'application/json'\n" +
    "}\n" +
    "\n" +
    "response = requests.request(\"POST\", url, headers=headers, data=payload)\n" +
    "\n" +
    "print(response.text)").value;

document.getElementById('codeBlock').innerHTML = example_php;

function selectLanguage(lang, element) {
    let tabs = document.getElementsByClassName('tab__item');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('tab_active');
    }
    element.classList.add('tab_active');
    switch (lang) {
        case 'php':
            document.getElementById('codeBlock').innerHTML = example_php;
            break;
        case 'js':
            document.getElementById('codeBlock').innerHTML = example_js;
            break;
        case 'nodejs':
            document.getElementById('codeBlock').innerHTML = example_nodejs;
            break;
        case 'python':
            document.getElementById('codeBlock').innerHTML = example_python;
            break;
    }
}

loadUptime();