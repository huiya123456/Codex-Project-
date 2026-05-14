# Demo V0 零蒸馏完整输出：幸运金龙 Lucky Golden Dragon

说明：本文件是根据手册要求生成的第一版基准输出，用于启动后续人工评分和蒸馏对比。真实使用时，建议把每个环节复制到对应智能体子项目中重新运行，并以真实输出覆盖本文件的对应段落。

## 1. 客户需求智能体输出：项目立项书

【项目名称】幸运金龙 Lucky Golden Dragon

【项目类型】Slot，竖屏单机，5x3 卷轴，Unity

【主题描述】以中国金龙传说、财富祝福、云海宫殿和金色祥瑞为核心主题，强调好运、奖池爆发和节庆感。

【目标市场】东南亚，优先越南、泰国、印尼。视觉需高饱和、高识别度，文本量尽量少，符号含义直观。

【核心玩法要求】基础 5x3 卷轴，建议 20-25 条固定赔线，包含 Wild、Scatter、Bonus，支持基础中奖、Free Spin、Bonus Game 和三级奖池。

【特色功能要求】
1. 金龙 Free Spin：Scatter 触发免费旋转，期间 Wild 可扩展。
2. 龙珠 Bonus：Bonus 符号触发选龙珠小游戏，获得倍数、金币或奖池入口。
3. 三阶奖池：MINI / MINOR / MAJOR，通过金龙能量条或 Bonus 结果触发。

【参考竞品】客户未提供具体竞品，建议补充 2-3 款东南亚市场表现较好的 dragon / prosperity / gold 主题 Slot 作为视觉和节奏参考。

【交付周期】乐观工期 12 周，保守工期 14 周。若需要高质量美术资产和完整真机调优，建议按 14 周规划，12 周作为压缩排期。

【优先级排序】第一优先级为基础玩法和 Free Spin，第二优先级为 Bonus 游戏，第三优先级为奖池表现和美术动效包装。

【风险提示】12 周存在美术和测试压缩风险；Bonus 与奖池叠加会增加数值验证成本；东南亚多语言和合规细节需客户补充。

【各岗位工作触发指令】
- 策划智能体：输出完整 Slot 策划案，包含符号、赔率参考、3 个特色功能、奖池和数值目标。
- 主美智能体：给出金龙主题视觉风格、符号设计清单、UI 风格和 GPT Image 提示词。
- 程序智能体：设计卷轴、中奖判定、Free Spin、Bonus、奖池和 RNG 技术方案。
- 项目管理智能体：基于 12 周交付目标制定压缩排期和风险预案。

## 2. AI项目经理输出：全链路工作计划

【工作目标】在 12 周内完成 Lucky Golden Dragon Slot 的策划、美术、动画、特效、TA、程序、音效、测试和交付准备。

【任务顺序】
1. 客户需求确认：补充竞品、语言、平台、合规和预算边界。
2. Slot策划：3 天内完成核心策划案初稿。
3. 主美与原画UI：策划初稿后 3 天内完成风格方案和首批关键符号。
4. 动画与特效：基于符号和功能方案制定动效规范。
5. TA与程序：并行建立 Unity 技术框架和资产规范。
6. 音效：根据视觉方向和玩法节奏制定音频清单。
7. 测试：提前介入 RTP、功能和边界测试设计。
8. 项目管理：每周同步排期、风险和交付物。

【当前风险】12 周排期偏紧；Bonus 和奖池组合可能影响数值验证；美术量需控制；客户竞品缺失会影响方向判断。

【需人工介入】确认最终创意方向、竞品参考、RTP 目标、奖池商业策略、上线审批。

## 3. Slot策划输出：核心策划案

【基础信息】Lucky Golden Dragon，东南亚市场，中国金龙财富主题，5x3 卷轴，20 条固定赔线，竖屏 Unity 单机。

【世界观】玩家进入云海中的金龙宝殿，通过唤醒龙珠收集财富能量，最终触发金龙赐福和大奖池。

【符号体系】
- 高价值符号：金龙、龙珠、金元宝。
- 低价值符号：A、K、Q、J、10，使用金色牌面和祥云边框。
- Wild：金龙爪印，可替代普通中奖符号。
- Scatter：祥云卷轴，3 个及以上触发 Free Spin。
- Bonus：发光龙珠，3 个及以上触发龙珠 Bonus。

【基础规则】
- 卷轴：5x3。
- 赔线：20 条固定线。
- RTP 目标：96% 左右，最终需数学模型确认。
- 波动：中高波动，适配奖池和 Bonus 期待感。

【特色功能】
1. 金龙 Free Spin：3/4/5 个 Scatter 触发 8/12/15 次免费旋转。Free Spin 中随机 Wild 可扩展整轴。
2. 龙珠 Bonus：3 个 Bonus 触发 9 选 3 龙珠小游戏。奖励包括金币、倍数、额外 Free Spin、奖池入口。
3. 金龙奖池：收集龙鳞能量，满格后进入 MINI / MINOR / MAJOR 抽取。能量可由 Wild、Bonus 或大奖结算累积。

【美术需求】金龙主角、云海宫殿背景、龙珠 Bonus 界面、三级奖池 UI、Wild/Scatter/Bonus 特殊符号、普通牌面符号。

【程序需求】卷轴权重表、赔线计算、Scatter 计数、Bonus 状态机、奖池累积、奖励结算、RNG 日志、配置表驱动。

## 4. 主美 + 原画UI输出：视觉方案

【视觉关键词】golden dragon, prosperity, chinese myth, jade, red and gold, cloud palace, high contrast mobile slot art。

【风格方向】高饱和红金配色，辅以翡翠绿和深蓝云海，符号边框统一使用金属浮雕，主界面保持清晰的大按钮和强反馈。

【符号设计清单】
- 金龙：主视觉与最高价值符号，正面盘旋姿态。
- 龙珠：Bonus 符号，内部有发光能量。
- 金元宝：高价值符号。
- Wild：龙爪金印，需醒目。
- Scatter：祥云圣旨或卷轴。
- A/K/Q/J/10：低价值牌面，统一金边和红底。

【GPT Image 提示词】
1. game art style, majestic golden dragon character for mobile slot game, chinese mythological aesthetic, red and gold palette, jade accents, clean background, high detail, no text, no watermark
2. game icon design, glowing dragon pearl bonus symbol, chinese prosperity slot game, vibrant gold and crimson, clean isolated background, high detail, no text
3. slot game symbol, golden ingot with ornate chinese cloud frame, mobile game asset, high contrast, polished rendering, no text, no watermark

## 5. 动画输出：动画规范

【卷轴动画】启动 0.2 秒加速，匀速滚动 0.8-1.2 秒，停止 0.25 秒回弹。中奖线停止后延迟 0.15 秒播放高亮。

【符号三状态】普通态保持轻微高光；触发态播放放大、闪光和粒子；大奖态增加屏幕震动、金光扫过和金币飞出。

【特色功能动画】
- Free Spin 进入：Scatter 汇聚成金龙门，金龙穿门进入免费旋转。
- Bonus 触发：龙珠依次点亮，界面切入 9 选 3。
- 奖池爆发：能量条满格后金龙环绕奖池牌，停在对应奖池。

## 6. 特效输出：特效方案

【连线特效】金色路径从左到右扫过，中奖符号边框发光，金币数字弹出。

【符号触发】Wild 使用爪痕光效；Scatter 使用祥云扩散；Bonus 使用龙珠脉冲光。

【奖池特效】MINI 用小范围金币雨，MINOR 增加屏幕边缘金光，MAJOR 加入全屏龙影、震屏和爆发粒子。

【性能约束】单屏粒子数量建议不超过 150；高频 UI 粒子复用材质；移动端优先使用序列帧和合批材质。

## 7. TA输出：Unity资产导入和场景方案

【纹理】UI 与符号使用 Sprite Atlas；Android 优先 ASTC 或 ETC2，iOS 使用 ASTC；普通 UI 关闭不必要 MipMap。

【场景层级】Canvas_Main、ReelRoot、SymbolPool、FeatureOverlay、JackpotPanel、AudioRoot、DebugPanel。

【适配】竖屏 1080x1920 基准，安全区适配刘海屏；卷轴区固定比例，底部按钮区可弹性布局。

【性能】符号对象池复用；大奖特效预加载；低端机提供粒子降级开关。

## 8. 程序输出：Unity技术方案

【核心模块】
- ReelController：卷轴状态机，负责启动、滚动、停止。
- SymbolTable：符号权重和结果配置。
- PaylineEvaluator：赔线中奖判定。
- FeatureManager：Free Spin、Bonus、奖池状态切换。
- JackpotSystem：三级奖池累积和触发。
- RNGService：随机数生成和日志记录。

【实现思路】所有玩法参数配置表驱动；基础旋转与特色功能解耦；结算流程统一走 SpinResult，便于测试复现。

【伪代码】
```csharp
SpinResult Spin(BetContext bet) {
    var grid = rng.GenerateGrid(symbolWeights);
    var wins = paylineEvaluator.Evaluate(grid, bet);
    var features = featureManager.CheckTriggers(grid, bet);
    return new SpinResult(grid, wins, features);
}
```

【注意事项】RNG 需要可追踪种子；Bonus 与奖池不能造成重复结算；RTP 验证需独立模拟器支持。

## 9. 音效输出：音频清单

【BGM】中国风节庆配器，古筝、笛子、鼓点与现代低频结合，循环长度 60-90 秒。

【基础音效】按钮点击、卷轴启动、卷轴停止、普通中奖、小奖、中等奖、大奖、金币计数。

【特色音效】Free Spin 入场、Scatter 点亮、龙珠选择、奖池能量上涨、MINI/MINOR/MAJOR 结算。

【格式】BGM 使用 ogg，音效使用 wav，44100Hz。

## 10. 测试输出：测试计划

【功能测试】基础旋转、赔线结算、Wild 替代、Scatter 触发、Bonus 触发、奖池触发、断线恢复。

【数值测试】模拟 100 万次，验证 RTP 误差小于 0.1%；验证 Free Spin、Bonus、奖池触发频率符合配置。

【边界测试】余额不足、最小赌注、最大赌注、连续触发、设备切后台、网络异常、重复点击。

【兼容测试】覆盖主流 Android 低中高端设备和 iOS 机型，重点观察发热、掉帧、适配和内存。

## 11. 项目管理输出：12周排期

| 周期 | 重点任务 | 主要产出 |
|---|---|---|
| 第1周 | 需求确认、立项、策划框架 | 立项书、核心玩法方向 |
| 第2周 | 策划案、数值草案、风格探索 | 策划案V1、风格板 |
| 第3周 | 符号原画、UI框架、程序框架 | 符号草图、技术框架 |
| 第4周 | 特色功能细化、主视觉、卷轴原型 | 原型版本、主视觉 |
| 第5周 | 美术批量产出、Free Spin开发 | 符号资产、功能初版 |
| 第6周 | Bonus和奖池开发、动效规范 | Bonus初版、奖池初版 |
| 第7周 | TA整合、特效接入、音效清单 | 可玩版本 |
| 第8周 | 功能联调、数值模拟、UI完善 | Alpha版本 |
| 第9周 | 全量美术音效接入、性能优化 | Beta版本 |
| 第10周 | QA测试、Bug修复、RTP验证 | 测试报告V1 |
| 第11周 | 回归测试、兼容测试、上线包准备 | RC版本 |
| 第12周 | 最终验收、客户演示、上线审批 | 交付包 |

【压缩风险】第5-8周是最大风险区，建议美术和程序并行但每周设固定验收点。
