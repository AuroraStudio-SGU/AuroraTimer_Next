<template>
  <div class="menu">
    <div class="white-box">
      <div class="Title p-4">用来测试各种功能</div>
      <div class="between">
        <div>
          <el-button class="obj" plain type="success" @click="sendMsg">测试通知</el-button>
        </div>
        <div>
          <el-button class="obj" plain @click="sendMsgIn"> 应用内通知</el-button>
        </div>
        <div>
          <el-button class="obj" plain type="success" @click="loadSetting">加载设置文件</el-button>
        </div>
        <div>
          <el-button class="obj" plain type="success" @click="SunRise">日落日期测试</el-button>
        </div>
        <div>
          <el-select
              v-model="testPage"
              class="m-2"
              placeholder="其它测试页面"
              @change="jumpTo"
          ><!-- 太多测试页面了放不下！!-->
            <el-option
                v-for="item in otherTestPage"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-button class="obj" plain type="success" @click="sendReq">请求测试</el-button>
        </div>
        <div>
          <span class="label-text">图表显示</span>
          <el-switch
              v-model="isShowTable"
              :active-icon="Check"
              :inactive-icon="Close"
              class="mt-2"
              inline-prompt
              style="margin-left: 24px"
              @change="loadTable"
          />
        </div>
      </div>
      <div class="container-self">
        <div class="header-self">
          <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                  d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              ></path>
            </g>
          </svg>
          <p>Browse File to upload!</p>
        </div>
        <label for="file" class="footer-self">
          <svg
              fill="#000000"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"

          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
              <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
            </g>
          </svg>
          <p>Not selected file</p>
          <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                  d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
                  stroke="#000000"
                  stroke-width="2"
              ></path>
              <path
                  d="M19.5 5H4.5"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
              ></path>
              <path
                  d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z"
                  stroke="#000000"
                  stroke-width="2"
              ></path>
            </g>
          </svg>
        </label>
        <input id="file" @click="openFile"/>
      </div>
      <div
          v-if="isShowTable"
          id="plotly"
          ref="plotlyContainer"
          class="plotly-container ">
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {Check, Close} from "@element-plus/icons-vue";
import "../assets/css/common.css";
import {ElNotification} from "element-plus";
import {CalculateSunTime, currentDate, formatSecondTime,} from "../utils/TimeUtil";
import {ref} from "vue";
import Plotly from "plotly.js-dist";
import {router} from "../utils/router";
import {getUrl} from "../utils/urlUtils";
import * as API from "../api/API"
import {CallbackEnum} from "../api/interfaces/CallbackEnum";

const plotlyContainer = ref(null);
let testPage = ref("");
const isShowTable = ref(false);
const otherTestPage = [
  // {label: '主题测试', value: 'ThemeTest'},
];

const loadTable = (value) => {
  if (value) {
    setTimeout(() => {
      loadAnimation();
    }, 500);
  }
};
const jumpTo = (local) => {
  router.push({
    name: local,
  });
};

const loadAnimation = () => {
  const jsonStr = `{"dates":["2023-4-10","2023-4-11","2023-4-12","2023-4-13","2023-4-14","2023-4-15","2023-4-16","2023-4-17","2023-4-18","2023-4-19","2023-4-20","2023-4-21","2023-4-22","2023-4-23","2023-4-24","2023-4-25","2023-4-26","2023-4-27","2023-4-28","2023-4-29","2023-4-30","2023-4-31","2023-5-1","2023-5-2","2023-5-3","2023-5-4","2023-5-5","2023-5-6","2023-5-7","2023-5-8","2023-5-9","2023-5-10","2023-5-11","2023-5-12","2023-5-13","2023-5-14","2023-5-15","2023-5-16","2023-5-17","2023-5-18","2023-5-19","2023-5-20","2023-5-21","2023-5-22","2023-5-23","2023-5-24","2023-5-25","2023-5-26","2023-5-27","2023-5-28","2023-5-29","2023-5-30","2023-6-1","2023-6-2","2023-6-3","2023-6-4","2023-6-5","2023-6-6","2023-6-7","2023-6-8","2023-6-9","2023-6-10","2023-6-11","2023-6-12","2023-6-13","2023-6-14","2023-6-15","2023-6-16","2023-6-17","2023-6-18","2023-6-19","2023-6-20","2023-6-21","2023-6-22","2023-6-23","2023-6-24","2023-6-25","2023-6-26","2023-6-27","2023-6-28","2023-6-29","2023-6-30","2023-6-31","2023-7-1","2023-7-2","2023-7-3","2023-7-4","2023-7-5","2023-7-6","2023-7-7","2023-7-8","2023-7-9","2023-7-10","2023-7-11","2023-7-12","2023-7-13","2023-7-14","2023-7-15","2023-7-16","2023-7-17","2023-7-18","2023-7-19","2023-7-20","2023-7-21","2023-7-22","2023-7-23","2023-7-24","2023-7-25","2023-7-26","2023-7-27","2023-7-28","2023-7-29","2023-7-30","2023-7-31","2023-8-1","2023-8-2","2023-8-3","2023-8-4","2023-8-5","2023-8-6","2023-8-7","2023-8-8","2023-8-9","2023-8-10","2023-8-11","2023-8-12","2023-8-13","2023-8-14","2023-8-15","2023-8-16","2023-8-17","2023-8-18","2023-8-19","2023-8-20","2023-8-21","2023-8-22","2023-8-23","2023-8-24","2023-8-25","2023-8-26","2023-8-27","2023-8-28","2023-8-29","2023-8-30","2023-9-1","2023-9-2","2023-9-3","2023-9-4","2023-9-5","2023-9-6","2023-9-7","2023-9-8","2023-9-9","2023-9-10","2023-9-11","2023-9-12","2023-9-13","2023-9-14","2023-9-15","2023-9-16","2023-9-17","2023-9-18","2023-9-19","2023-9-20","2023-9-21","2023-9-22","2023-9-23","2023-9-24","2023-9-25","2023-9-26","2023-9-27","2023-9-28","2023-9-29","2023-9-30","2023-9-31","2023-10-1","2023-10-2","2023-10-3","2023-10-4","2023-10-5","2023-10-6","2023-10-7","2023-10-8","2023-10-9","2023-10-10","2023-10-11","2023-10-12","2023-10-13","2023-10-14","2023-10-15","2023-10-16","2023-10-17","2023-10-18","2023-10-19","2023-10-20","2023-10-21","2023-10-22","2023-10-23","2023-10-24","2023-10-25","2023-10-26","2023-10-27","2023-10-28","2023-10-29","2023-10-30","2023-11-1","2023-11-2","2023-11-3","2023-11-4","2023-11-5","2023-11-6","2023-11-7","2023-11-8","2023-11-9","2023-11-10","2023-11-11","2023-11-12","2023-11-13","2023-11-14","2023-11-15","2023-11-16","2023-11-17","2023-11-18","2023-11-19","2023-11-20","2023-11-21","2023-11-22","2023-11-23","2023-11-24","2023-11-25","2023-11-26","2023-11-27","2023-11-28","2023-11-29","2023-11-30","2024-11-31","2023-12-1","2023-12-2","2023-12-3","2023-12-4","2023-12-5","2023-12-6","2023-12-7","2023-12-8","2023-12-9","2023-12-10","2023-12-11","2023-12-12","2023-12-13","2023-12-14","2023-12-15","2023-12-16","2023-12-17","2023-12-18","2023-12-19","2023-12-20","2023-12-21","2023-12-22","2023-12-23","2023-12-24","2023-12-25","2023-12-26","2023-12-27","2023-12-28","2023-12-29","2023-12-30","2023-12-31","2024-1-1","2024-1-2","2024-1-3","2024-1-4","2024-1-5","2024-1-6","2024-1-7","2024-1-8","2024-1-9","2024-1-10","2024-1-11","2024-1-12","2024-1-13","2024-1-14","2024-1-15","2024-1-16","2024-1-17","2024-1-18","2024-1-19","2024-1-20","2024-1-21","2024-1-22","2024-1-23","2024-1-24","2024-1-25","2024-1-26","2024-1-27","2024-1-28","2024-1-29","2024-2-1","2024-2-2","2024-2-3","2024-2-4","2024-2-5","2024-2-6","2024-2-7","2024-2-8","2024-2-9","2024-2-10","2024-2-11","2024-2-12","2024-2-13","2024-2-14","2024-2-15","2024-2-16","2024-2-17","2024-2-18","2024-2-19","2024-2-20","2024-2-21","2024-2-22","2024-2-23","2024-2-24","2024-2-25","2024-2-26","2024-2-27","2024-2-28","2024-2-29","2024-2-30","2024-2-31","2024-3-1","2024-3-2","2024-3-3","2024-3-4","2024-3-5","2024-3-6","2024-3-7","2024-3-8","2024-3-9","2024-3-10","2024-3-11","2024-3-12","2024-3-13","2024-3-14","2024-3-15","2024-3-16","2024-3-17","2024-3-18","2024-3-19","2024-3-20","2024-3-21","2024-3-22","2024-3-23","2024-3-24","2024-3-25","2024-3-26","2024-3-27","2024-3-28","2024-3-29","2024-3-30","2024-4-1","2024-4-2","2024-4-3","2024-4-4","2024-4-5","2024-4-6","2024-4-7","2024-4-8","2024-4-9"],"y":[848,366,16,78,397,876,803,328,315,945,990,36,680,384,247,166,671,527,983,984,436,651,410,711,757,542,624,766,435,770,413,975,763,908,945,930,352,293,672,943,126,358,26,810,723,488,948,23,799,898,402,264,501,86,718,453,595,655,335,648,379,19,979,719,514,242,8,100,545,343,61,839,144,433,861,739,548,439,80,814,200,369,574,874,270,804,444,466,262,755,641,940,802,197,198,343,584,479,101,450,179,720,84,349,622,905,754,885,527,427,872,323,582,612,90,144,149,377,923,788,852,736,270,812,491,705,957,744,673,172,675,297,709,111,685,429,755,804,997,596,784,399,303,686,869,636,323,268,739,104,853,699,593,138,405,998,536,28,98,621,531,406,149,997,640,474,872,811,303,736,380,370,111,298,836,226,514,42,87,487,273,475,180,767,755,147,704,339,688,713,112,258,373,336,452,864,223,817,881,69,413,727,394,199,405,923,702,325,639,962,669,873,190,398,162,56,19,417,311,44,498,234,637,602,372,661,164,945,544,992,762,90,154,146,669,873,113,916,231,827,512,197,718,216,366,667,102,993,801,204,349,177,706,236,256,122,741,545,777,132,506,976,888,464,258,181,156,771,214,381,742,479,855,44,501,499,475,196,270,394,32,321,412,861,422,653,91,956,892,477,573,135,207,169,902,275,562,391,544,611,203,636,473,910,480,312,22,477,6,502,480,154,895,405,537,708,556,209,705,839,179,567,606,792,214,193,574,808,667,816,419,682,609,587,73,636,763,31,497,855,418,940,865,94,19,2,163,978,33,795,802,325,723,796,305,235,227,690,94,663,294,164,650,47,521,232]}`;

  let json = JSON.parse(jsonStr);

  const frames = [];
  const x = json.dates;
  const y = json.y;

  const n = 100;
  for (let i = 0; i < n; i++) {
    frames[i] = {data: [{x: [], y: []}]}
    frames[i].data[0].x = x.slice(0, i + 1);
    frames[i].data[0].y = y.slice(0, i + 1);
  }


  const trace1 = {
    x: frames[1].data[0].x,
    y: frames[1].data[0].y,
    fill: 'tozeroy',
    type: 'scatter',
    mode: 'lines',
    line: {color: 'green'}
  };

  const data = [trace1];

  const layout = {
    title: '打卡程度表',
    xaxis: {
      range: [frames[99].data[0].x[0], frames[99].data[0].x[99]],
      showgrid: false
    },
    yaxis: {
      range: [0, 1024],
      showgrid: false
    },
    legend: {
      orientation: 'h',
      x: 0.5,
      y: 1.2,
      xanchor: 'center'
    },
    updatemenus: [{
      x: 0.5,
      y: 0,
      yanchor: "top",
      xanchor: "center",
      showactive: false,
      direction: "left",
      type: "buttons",
      pad: {"t": 87, "r": 10},
      buttons: [{
        method: "animate",
        args: [null, {
          fromcurrent: true,
          transition: {
            duration: 0,
          },
          frame: {
            duration: 40,
            redraw: false
          }
        }],
        label: "播放"
      }, {
        method: "animate",
        args: [
          [null],
          {
            mode: "immediate",
            transition: {
              duration: 0
            },
            frame: {
              duration: 0,
              redraw: false
            }
          }
        ],
        label: "暂停"
      }]
    }]
  };
  Plotly.newPlot(plotlyContainer.value, data, layout).then(function () {
    Plotly.addFrames(plotlyContainer.value, frames);
  });
  document.getElementsByClassName('main-svg')[0].style.backgroundColor = ""
};

const openFile = () => {
  window.electronAPI.openFile();

  // console.log(os.homedir())
};
const loadSetting = () => {
  window.electronAPI.loadSetting();
};

const SunRise = () => {
  let sunTime = CalculateSunTime();
  let curDate = Date.parse(currentDate().Date);
  let message =
      "当前日出时间" +
      formatSecondTime((sunTime.Sunrise - curDate) / 1000) +
      " \n 日落时间:" +
      formatSecondTime((sunTime.Sunset - curDate) / 1000);
  ElNotification({
    title: "日出日落测试",
    message,
    type: "success",
  });
};

const sendMsgIn = () => {
  ElNotification({
    title: "应用内提示！",
    message: "I'm storm of the power",
  });
};

const sendReq = async () => {
  let apiRes: APIResponse = await API.getPing()
  if (!apiRes.success) {
    ElNotification({
      title: "请求失败！",
      message: apiRes.msg,
      type: "error"
    });
  } else {
    ElNotification({
      title: "请求成功！",
      message: "返回值:" + JSON.stringify(apiRes.data),
      type: 'success'
    });
  }
}

try {
  window.electronAPI.CallbackInformation((_event, Enum) => {
    if(Enum === CallbackEnum.RESTARTTIMER){
      ElNotification({
        title: '重新恢复计时',
        type: 'success'
      })
    }else {
      console.log("NO OK")
    }
  })
} catch (e) {
}


const sendMsg = () => {
  const NOTIFICATION_TITLE = "一个标题";
  const NOTIFICATION_BODY = "您有一个好！";
  console.log(getUrl('icon.png'))
  let options = {
    body: NOTIFICATION_BODY,
    icon: getUrl('icon-sm.png')
  }
  // new Notification(NOTIFICATION_TITLE,options).onclick =
  //   () => {
  //     ElNotification({
  //       title: "你点击了系统的通知提示",
  //       message: "我知道了我知道了.jpg",
  //     });
  //   };
  const dialogOpts = {
    type: 'warning',
    buttons: ['恢复计时', '恢复计时'],
    title: '你还在吗?挂机太长时间不计时的哦!',
    message: "看不到通知？这个总能看到了把，要是这个看不到，那我也没办法了(这就是个测试消息呀！)",
    detail: `我尽力让你看到这个消息了`
  }
  window.electronAPI.PushSysNotification(dialogOpts)
};
</script>

<style scoped>

.plotly-container {
  @apply w-9/12 h-4/5;
  @apply bg-base-100;
}

.container-self {
  height: 300px;
  width: 300px;
  border-radius: 10px;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  gap: 5px;
  background-color: rgba(0, 110, 255, 0.041);
  transform: scale(0.8);
}

.header-self {
  flex: 1;
  width: 100%;
  border: 2px dashed;
  @apply border-b-base-100;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.header-self svg {
  height: 100px;
}

.header-self p {
  text-align: center;
  @apply text-base-content;
}

.footer-self {
  background-color: rgba(0, 110, 255, 0.075);
  width: 100%;
  height: 40px;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @apply text-base-content;
  border: none;
}

.footer-self svg {
  height: 130%;
  @apply fill-current stroke-current;
  background-color: rgba(70, 66, 66, 0.103);
  border-radius: 50%;
  padding: 2px;
  cursor: pointer;
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.205);
}

.footer-self p {
  flex: 1;
  text-align: center;
}

#file {
  display: none;
}

.between {
  @apply grid gap-4 grid-cols-5;
}
</style>
