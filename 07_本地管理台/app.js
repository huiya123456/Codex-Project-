const agents = [
  ["01", "客户需求智能体", "解析客户原始需求，输出结构化立项书和岗位触发指令。", "最高", "agent/01-customer-requirements", "../01_智能体配置/01_客户需求智能体.md", "01_customer_requirements"],
  ["02", "AI项目经理智能体", "统筹全链路任务，审查方向，识别风险和人工确认点。", "最高", "agent/02-ai-project-manager", "../01_智能体配置/02_AI项目经理智能体.md", "02_ai_project_manager"],
  ["03", "Slot策划智能体", "输出 Slot 玩法、符号、特色功能、奖池和数值参考。", "最高", "agent/03-slot-planner", "../01_智能体配置/03_Slot策划智能体.md", "03_slot_planner"],
  ["04", "文审机策划智能体", "负责多人竞技文审机玩法、生肖角色和规则平衡方案。", "高", "agent/04-wenshen-planner", "../01_智能体配置/04_文审机策划智能体.md", "04_wenshen_planner"],
  ["05", "大厅策划智能体", "负责游戏总大厅入口逻辑、用户路径和功能策划。", "中", "agent/05-lobby-planner", "../01_智能体配置/05_大厅策划智能体.md", "05_lobby_planner"],
  ["06", "策划执行层智能体", "处理文档撰写、需求拆解、会议纪要和日报周报。", "最高", "agent/06-planning-executor", "../01_智能体配置/06_策划执行层智能体.md", "06_planning_executor"],
  ["07", "主美智能体", "负责视觉风格总控、质量审核和 GPT Image 提示词规范。", "高", "agent/07-art-director", "../01_智能体配置/07_主美智能体.md", "07_art_director"],
  ["08", "美术组长智能体", "负责美术任务分配、进度跟踪和中层产出审核。", "高", "agent/08-art-lead", "../01_智能体配置/08_美术组长智能体.md", "08_art_lead"],
  ["09", "原画UI智能体", "负责符号、角色、背景、UI 概念图和提示词资产。", "高", "agent/09-concept-ui", "../01_智能体配置/09_原画UI智能体.md", "09_concept_ui"],
  ["10", "动画智能体", "输出符号动画、角色动画、特色功能动画规范。", "中", "agent/10-animation", "../01_智能体配置/10_动画智能体.md", "10_animation"],
  ["11", "特效智能体", "输出连线、奖池、符号触发和战斗特效方案。", "中", "agent/11-vfx", "../01_智能体配置/11_特效智能体.md", "11_vfx"],
  ["12", "3D动作智能体", "负责骨骼绑定、动作分类、Animator 状态机和性能约束。", "低", "agent/12-3d-motion", "../01_智能体配置/12_3D动作智能体.md", "12_3d_motion"],
  ["13", "3D模型智能体", "负责建模面数、贴图通道、命名规范和验收标准。", "低", "agent/13-3d-modeling", "../01_智能体配置/13_3D模型智能体.md", "13_3d_modeling"],
  ["14", "TA技术美术智能体", "负责 Unity 资产导入、场景搭建、Shader 和性能优化。", "中", "agent/14-technical-artist", "../01_智能体配置/14_TA技术美术智能体.md", "14_technical_artist"],
  ["15", "程序智能体", "输出 Unity 技术方案、核心类设计、接口和伪代码框架。", "高", "agent/15-programmer", "../01_智能体配置/15_程序智能体.md", "15_programmer"],
  ["16", "音效智能体", "负责音效清单、风格规范、格式标准和 Unity 接入说明。", "中", "agent/16-audio", "../01_智能体配置/16_音效智能体.md", "16_audio"],
  ["17", "测试智能体", "负责 QA 流程、RTP 验证、测试用例和 Bug 分级。", "高", "agent/17-qa", "../01_智能体配置/17_测试智能体.md", "17_qa"],
  ["18", "项目管理智能体", "负责排期、版本管理、上线检查和交付协调。", "最高", "agent/18-project-management", "../01_智能体配置/18_项目管理智能体.md", "18_project_management"]
];

const training = [
  ["T-A", "成员A Slot策划训练数据", "沉淀 Slot 主题判断、特色功能、竞品分析、RTP 和奖池经验。", "training/member-a-slot", "../02_训练数据/T-A_成员A_Slot策划方向/README.md", "T-A_member_a_slot"],
  ["T-B", "成员B 文审机策划训练数据", "沉淀多人竞技规则、生肖技能、平衡判断和关卡难度经验。", "training/member-b-wenshen", "../02_训练数据/T-B_成员B_文审机策划方向/README.md", "T-B_member_b_wenshen"],
  ["T-C", "成员C 策划执行层训练数据", "沉淀文档撰写、需求拆解、会议纪要、日报周报经验。", "training/member-c-planning-exec", "../02_训练数据/T-C_成员C_策划执行层通用/README.md", "T-C_member_c_planning_exec"]
];

function agentCard([index, name, description, priority, branch, config, path]) {
  return `
    <article class="agent-card" data-priority="${priority}">
      <div class="card-top">
        <span class="index">${index}</span>
        <span class="priority">${priority}优先级</span>
      </div>
      <h3>${name}</h3>
      <p>${description}</p>
      <p class="path">${branch}<br>建议目录：${path}</p>
      <div class="actions">
        <a href="${config}">配置</a>
        <a href="../00_执行中枢/本地工作树映射表.md">worktree</a>
      </div>
    </article>
  `;
}

function trainingCard([index, name, description, branch, config, path]) {
  return `
    <article class="training-card">
      <div class="card-top">
        <span class="index">${index}</span>
        <span class="priority">训练数据</span>
      </div>
      <h3>${name}</h3>
      <p>${description}</p>
      <p class="path">${branch}<br>建议目录：${path}</p>
      <div class="actions">
        <a href="${config}">说明</a>
        <a href="../02_训练数据/训练数据窗口配置说明.md">配置</a>
      </div>
    </article>
  `;
}

document.getElementById("agentGrid").innerHTML = agents.map(agentCard).join("");
document.getElementById("trainingGrid").innerHTML = training.map(trainingCard).join("");

const viewerTitle = document.getElementById("viewerTitle");
const viewerContent = document.getElementById("viewerContent");
const viewerOpenLink = document.getElementById("viewerOpenLink");
const viewerVsCodeLink = document.getElementById("viewerVsCodeLink");
const viewerLocalPath = document.getElementById("viewerLocalPath");
let activeDocumentRequest = 0;

const projectRoot = "H:\\AI智能体项目\\Project";

function toLocalPath(url) {
  const relativePath = decodeURIComponent(url.pathname)
    .replace(/^\/+/, "")
    .replace(/\//g, "\\");
  return `${projectRoot}\\${relativePath}`;
}

function toVsCodeUrl(localPath) {
  return `vscode://file/${localPath.replace(/\\/g, "/")}`;
}

async function openDocument(event) {
  const link = event.target.closest("a[href$='.md']");
  if (!link) {
    return;
  }

  event.preventDefault();
  const requestId = activeDocumentRequest + 1;
  activeDocumentRequest = requestId;
  const url = new URL(link.getAttribute("href"), window.location.href);
  viewerTitle.textContent = link.textContent.trim();
  viewerContent.textContent = "正在读取文件...";
  viewerOpenLink.hidden = false;
  viewerOpenLink.href = url.href;
  const localPath = toLocalPath(url);
  viewerLocalPath.hidden = false;
  viewerLocalPath.textContent = localPath;
  viewerVsCodeLink.hidden = false;
  viewerVsCodeLink.href = toVsCodeUrl(localPath);

  try {
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const text = new TextDecoder("utf-8").decode(buffer);
    if (requestId !== activeDocumentRequest) {
      return;
    }

    viewerContent.textContent = text;
    document.querySelector(".document-viewer").scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    if (requestId !== activeDocumentRequest) {
      return;
    }

    viewerContent.textContent = `无法读取文件：${decodeURIComponent(url.pathname)}\n\n请确认本地服务器从 Project 根目录启动。\n错误信息：${error.message}`;
  }
}

document.addEventListener("click", openDocument);
