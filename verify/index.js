// 判断对象属性是否都有值
function checkObjectProperties(obj) {
  return Object.values(obj).every(value => {
    return value !== null && value !== undefined && value !== '';
  });
}

function random(num = 16) {
  const amm = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "&",
    "*",
    "(",
    ")",
    "_",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
  ];
  let tmp = Math.floor(Math.random() * num);
  let s = tmp;
  s = s + amm[tmp];
  for (let i = 0; i < 7; i++) {
    tmp = Math.floor(Math.random() * 26);
    s = s + String.fromCharCode(65 + tmp);
  }
  for (let i = 0; i < 7; i++) {
    tmp = Math.floor(Math.random() * 26);
    s = s + String.fromCharCode(97 + tmp);
  }
  return s;
}
async function sha1Code(data) {
  try {
    const encoder = new TextEncoder();
    const dataArray = encoder.encode(data);

    const hashBuffer = await crypto.subtle.digest("SHA-1", dataArray);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return hashHex;
  } catch (error) {
    console.error(error);
    throw new Error("SHA-1 hashing failed");
  }
}

window.onload = async function () {
  let country = { name: "china", code: "86" };

  const apiUrl = "https://bbci.bbim.io";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("version", "0.0.1");
  headers.append("os", "win");
  headers.append("over", 0);
  headers.append("lang", "en");

  function requestApi(url, data) {
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    };
    return fetch(`${apiUrl}${url}`, options).then((res) => res.json());
  }
  const response = await requestApi("/phonePrefixList", { ver: 0 });
  const items = response?.data?.items ?? [];

  const crownCode = document.querySelector("#crownCode");
  const dropbtnText = crownCode.querySelector(".dropbtn");
  const dropdown = crownCode.querySelector(".dropdown-content");

  // 动态添加 dropdownList的a
  items.forEach(function (item, index) {
    const childElement = document.createElement("a");
    childElement.innerHTML = `${item.name} +${item.code}`;
    dropdown.appendChild(childElement);
  });

  const dropdownList = crownCode
    .querySelector(".dropdown-content")
    .querySelectorAll("a");
  for (let i = 0; i < dropdownList.length; i++) {
    dropdownList[i].onclick = function () {
      country = items[i];
      dropbtnText.innerHTML = "+" + items[i].code;
    };
  }

  const formContainer = document.querySelector(".form-example-box");
  const submitBtn = document.querySelector("#submitBtn");
  submitBtn.addEventListener("click", submitForm);
  //  提交删除
  async function submitForm(e) {
    e.preventDefault();
    const formData = new FormData(formContainer);
    const formDataObj = Object.fromEntries(formData);
    if(checkObjectProperties(formDataObj) && formDataObj.captcha.length === 6){
      if (window.confirm('Please confirm  to continue deleting?')) {
        // 用户点击了确认按钮
        // 在这里执行打开天窗的操作
        const deleteAccountData = await requestApi("/deleteAccount", {prefix:country.code,...formDataObj});
           if (deleteAccountData.data.err_code === 0) {
            alert('operation successful！')
            window.location.href = '';
          }else{
            alert(deleteAccountData.data.err_msg)
          }
      } else {
        // 用户点击了取消按钮或关闭了对话框
        // 在这里执行取消操作
      }
      
    }else{
      alert('information filled in error！')
    }

  }

  // 发送验证码
  var verifyBtn = document.getElementById("send-verification-btn");

  async function startCountdown(event) {
    event.preventDefault();
    const phone = formContainer.phone.value;
    if (!phone.length) {
      alert("Please fill in the mobile phone number");
      return;
    }

    const SEND_CAPTCHA_KET = "@#t*$m&%)m48sms0";
    const currentTime = new Date().getTime();
    const randomStr = random();
    const _p = country.code + phone + "3" + randomStr + currentTime;
    const s = await sha1Code(_p + SEND_CAPTCHA_KET);
    const _s = await sha1Code(s + SEND_CAPTCHA_KET);
    // sendCaptcha
    const resCapt = await requestApi("/sendCaptcha", {
      prefix: country.code,
      phone,
      act: 3,
      rs: randomStr,
      t: currentTime,
      s: _s,
    });

    // 获取按钮元素

    // 设置倒计时时间（单位：秒）s
    var countdownTime = 5;

    // 禁用按钮点击
    verifyBtn.disabled = true;

    // 更新按钮文本为倒计时时间
    verifyBtn.innerHTML = countdownTime + " 秒";

    // 每秒更新倒计时时间
    var countdown = setInterval(function () {
      countdownTime--;
      verifyBtn.innerHTML = countdownTime + " 秒";

      // 倒计时结束时恢复按钮状态
      if (countdownTime <= 0) {
        clearInterval(countdown);
        verifyBtn.innerHTML = "发送验证码";
        verifyBtn.disabled = false;
      }
    }, 1000);
  }
  verifyBtn.addEventListener("click", startCountdown);

};
