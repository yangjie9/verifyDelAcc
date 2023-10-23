
window.onload = async function () {
  const apiUrl = "https://dev-bbci.bbim.io";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("version", "0.0.1");
  headers.append("os", "win");
  headers.append("over", 0);
  headers.append("lang", "en");

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ ver: 0 }),
  };
  const response = await fetch(`${apiUrl}/phonePrefixList`, options).then(
    (res) => {
      return res.json();
    }
  );
  const items = response?.data?.items ?? [];
  console.log("🚀 ~ file: deleteTheAccount.html:180 ~ res:", items);

  const crownData = [
    { country: "中国", code: "+86" },
    { country: "美国", code: "+1" },
    { country: "日本", code: "+81" },
    { country: "日本", code: "+81" },
    { country: "日本", code: "+81" },
    { country: "日本", code: "+81" },
    { country: "日本", code: "+81" },
    { country: "日本", code: "+81" },
    { country: "日本", code: "+81" },
    { country: "日本", code: "+81" },
    { country: "日本", code: "+81" },
    { country: "日本", code: "+81" },
    { country: "日本", code: "+81" },
    { country: "日本", code: "+81" },
    { country: "日本", code: "+81" },
  ];
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
      console.log("🚀 ~ file: deleteTheAccount.html:181 ~ i:", items[i]);
      dropbtnText.innerHTML = "+" + items[i].code;
    };
  }
};

const formContainer = document.querySelector(".form-example-box");
const submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click", submitForm);
//  提交表单事件
function submitForm() {
  const formData = new FormData(formContainer);
  const formDataObj = Object.fromEntries(formData);
  console.log(
    "🚀 ~ file: deleteTheAccount.html:191 ~ formDataObj:",
    formDataObj
  );

  // // 删除账户
  // const deleteAccount = async () => {
  //     const response = await fetch('/deleteAccount', {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(formDataObj)
  //     });
  //     const deleteAccountData = await response.json();
  //     console.log("🚀 ~ file: deleteTheAccount.html:200 ~ deleteAccountData:", deleteAccountData)
  //     if (deleteAccountData.status === 'success') {
  //         window.location.href = '/';
  //     }
  // }
  // deleteAccount();
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

    const hashBuffer = await CryptoJS.subtle.digest("SHA-1", dataArray);

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
