<template>
    <div class="all">
      <el-backtop :aria-disabled="true" :visibility-height="-1" style="width:3%;height:6%;box-shadow: 0 0 6px rgba(0,0,0, 0.12);" :bottom="220" :right="100">
        <el-tooltip content="新手引导" placement="left" effect="light">
          <el-button type="text" class="iconfont iconxinshouyindao" style="font-size:25px"></el-button>
        </el-tooltip>
    </el-backtop>
    <el-backtop :visibility-height="-1" style="width:3%;height:6%;box-shadow: 0 0 6px rgba(0,0,0, 0.12);" :bottom="160" :right="100">
      <el-tooltip content="在线客服" placement="left" effect="light" >
          <el-button type="text" class="iconfont iconkefu" style="font-size:25px"></el-button>
      </el-tooltip>
    </el-backtop>
    <el-backtop :visibility-height="-1" style="width:3%;height:6%;box-shadow: 0 0 6px rgba(0,0,0, 0.12);" :bottom="100" :right="100">
        <el-popover
          placement="left"
          trigger="hover"
          >
          <el-row>
            <el-col :span="12" style="text-align:center">
              <el-row>
                <img src="../../assets/img/PKMS_app.png" style="width:100px" />
              </el-row>
              <el-row>关注公众号</el-row>
            </el-col>
            <el-col :span="12" style="text-align:center">
              <el-row>
                <img src="../../assets/img/PKMS_app.png" style="width:100px" />
              </el-row>
              <el-row>下载APP客户端</el-row>
            </el-col>
          </el-row>
          <i class="iconfont iconai-code" style="font-size:25px" slot="reference"></i>
        </el-popover>
    </el-backtop>
    <el-backtop :visibility-height="1" style="width:3%;height:6%;box-shadow: 0 0 6px rgba(0,0,0, 0.12);" :right="100">
        <el-tooltip content="回到顶部" placement="left" effect="light" >
          <!-- <i class="iconfont iconbaobao" style="font-size:40px"></i> -->
          <i class="iconfont iconhuidaodingbu" style="font-size:25px"></i>
        </el-tooltip>
    </el-backtop>
      <div class="left"></div>
      <div class="center">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="'育儿圈子'" name="first">
            <el-row>我加入的圈子</el-row>
            <el-row class="annual-box">
              <el-card class="more"
                      :body-style="{ padding: '20px 10px 0px 10px', margin: '0px', border: '0px', background: 'rgba(255, 112, 112, 0.5)', height: '100px', width: '50px'}"
                      shadow="never">
                <el-row style="margin-left:6px">
                  <i class="iconfont iconadd-circle" style="color:#fff"></i>
                </el-row>
                <el-row style="text-align:center;width:15px;padding-left:7.5px;font-size:5px;color:#fff">发现更多</el-row>
              </el-card>
              <el-card class="annual"
                      :body-style="{ padding: '20px 0px 0px 0px', margin: '0px', border: '0px', background: 'rgba(255,0,0,0)', height: '100px'}"
                      shadow="never">
                <div class="bg">
                    <img :src="'/api/res/pkms_avatar/1027.jpg'"  style="width:105px;height:120px;border-radius:12px"/>
                </div>
                <div class="bg2" style="width:105px;height:120px;border-radius:12px">
                </div>
                <el-row style="text-align:center">
                  <img :src="'/api/res/pkms_avatar/1027.jpg'" style="width:55px;height:55px;border-radius:50%;border:2px solid #fff" />
                </el-row>
                <el-row style="text-align:center;color:#fff">建议反馈</el-row>
              </el-card>
              <el-card class="annual"
                      :body-style="{ padding: '20px 0px 0px 0px', margin: '0px', border: '0px', background: 'rgba(255,0,0,0)', height: '100px'}"
                      shadow="never">
                <div class="bg">
                    <img :src="'/api/res/pkms_avatar/1028.jpg'"  style="width:105px;height:120px;border-radius:12px"/>
                </div>
                <div class="bg2" style="width:105px;height:120px;border-radius:12px">
                </div>
                <el-row style="text-align:center">
                  <img :src="'/api/res/pkms_avatar/1028.jpg'" style="width:55px;height:55px;border-radius:50%;border:2px solid #fff" />
                </el-row>
                <el-row style="text-align:center;color:#fff">婚姻生活圈</el-row>
              </el-card>
              <el-card class="annual"
                      :body-style="{ padding: '20px 0px 0px 0px', margin: '0px', border: '0px', background: 'rgba(255,0,0,0)', height: '100px'}"
                      shadow="never">
                <div class="bg">
                    <img :src="'/api/res/pkms_avatar/1029.jpg'"  style="width:105px;height:120px;border-radius:12px"/>
                </div>
                <div class="bg2" style="width:105px;height:120px;border-radius:12px">
                </div>
                <el-row style="text-align:center">
                  <img :src="'/api/res/pkms_avatar/1029.jpg'" style="width:55px;height:55px;border-radius:50%;border:2px solid #fff" />
                </el-row>
                <el-row style="text-align:center;color:#fff">生男生女谈</el-row>
              </el-card>
              <el-card class="annual"
                      :body-style="{ padding: '20px 0px 0px 0px', margin: '0px', border: '0px', background: 'rgba(255,0,0,0)', height: '100px'}"
                      shadow="never">
                <div class="bg">
                    <img :src="'/api/res/pkms_avatar/1030.jpg'"  style="width:105px;height:120px;border-radius:12px"/>
                </div>
                <div class="bg2" style="width:105px;height:120px;border-radius:12px">
                </div>
                <el-row style="text-align:center">
                  <img :src="'/api/res/pkms_avatar/1030.jpg'" style="width:55px;height:55px;border-radius:50%;border:2px solid #fff" />
                </el-row>
                <el-row style="text-align:center;color:#fff">育儿交流圈</el-row>
              </el-card>
              <el-card class="annual"
                      :body-style="{ padding: '20px 0px 0px 0px', margin: '0px', border: '0px', background: 'rgba(255,0,0,0)', height: '100px'}"
                      shadow="never">
                <div class="bg">
                    <img :src="'/api/res/pkms_avatar/1031.jpg'"  style="width:105px;height:120px;border-radius:12px"/>
                </div>
                <div class="bg2" style="width:105px;height:120px;border-radius:12px">
                </div>
                <el-row style="text-align:center">
                  <img :src="'/api/res/pkms_avatar/1031.jpg'" style="width:55px;height:55px;border-radius:50%;border:2px solid #fff" />
                </el-row>
                <el-row style="text-align:center;color:#fff">宝宝常见疾病圈</el-row>
              </el-card>
              <el-card class="annual"
                      :body-style="{ padding: '20px 0px 0px 0px', margin: '0px', border: '0px', background: 'rgba(255,0,0,0)', height: '100px'}"
                      shadow="never">
                <div class="bg">
                    <img :src="'/api/res/pkms_avatar/1032.jpg'"  style="width:105px;height:120px;border-radius:12px"/>
                </div>
                <div class="bg2" style="width:105px;height:120px;border-radius:12px">
                </div>
                <el-row style="text-align:center">
                  <img :src="'/api/res/pkms_avatar/1032.jpg'" style="width:55px;height:55px;border-radius:50%;border:2px solid #fff" />
                </el-row>
                <el-row style="text-align:center;color:#fff">快乐孕期</el-row>
              </el-card>
            </el-row>
            <el-row style="margin:20px 0px 20px 0px;">大家都在说</el-row>
            <el-row style="padding:0px 10px 10px 10px">
              <el-row class="block">
                <el-row>
                  <el-col :span="2">
                    <img :src="'/api/res/pkms_avatar/1035.jpg'" style="width:50px;width:50px;border-radius:50%">
                  </el-col>
                  <el-col :span="14">
                    <el-row style="font-size:15px;padding-top:5px;color:#8B8989">桃子园丁</el-row>
                    <el-row style="font-size:12px;padding-top:5px;color:#8B8989">育龄8年</el-row>
                  </el-col>
                  <el-col :span="7" style="text-align:right;margin-top:15px">
                    <el-button size="mini" round plain>关注</el-button>
                  </el-col>
                  <el-col :span="1" style="text-align:right;margin-top:16px">
                    <i class="iconfont iconiconset0127" style="font-size:10px;color:#8B8989"></i>
                  </el-col>
                </el-row>
                <el-row>分娩痛，忍忍就过去了？2021的母亲节，对分娩痛说不！</el-row>
                <el-row style="font-size:12px;color:#8B8989;min-height:50px">
                  生产痛，是疼痛的最高等级。但在一些传统观念中认为， “分娩痛，忍忍就过去了” “成为一个母亲就得忍受疼痛”。
                </el-row>
                <hr style="border: 1px solid #EEE9E9" />
                <el-row style="margin-top:10px">
                  <el-col :span="8" style="text-align:center;color:#8B8989">
                    <i class="iconfont iconzhuanfa" style="font-size:20px"></i>&nbsp;转发
                  </el-col>
                  <el-col :span="8" style="text-align:center;color:#8B8989">
                    <i class="iconfont iconpinglun1" style="font-size:20px"></i>&nbsp;14
                  </el-col>
                  <el-col :span="8" style="text-align:center;color:#8B8989">
                    <i class="iconfont icondianzan3"></i>&nbsp;23
                  </el-col>
                </el-row>
              </el-row>
              <el-row class="block">
                <el-row>
                  <el-col :span="2">
                    <img :src="'/api/res/pkms_avatar/1036.jpg'" style="width:50px;width:50px;border-radius:50%">
                  </el-col>
                  <el-col :span="14">
                    <el-row style="font-size:15px;padding-top:5px;color:#8B8989">董家小姐</el-row>
                    <el-row style="font-size:12px;padding-top:5px;color:#8B8989">育龄2年</el-row>
                  </el-col>
                  <el-col :span="7" style="text-align:right;margin-top:15px">
                    <el-button size="mini" round plain>关注</el-button>
                  </el-col>
                  <el-col :span="1" style="text-align:right;margin-top:16px">
                    <i class="iconfont iconiconset0127" style="font-size:10px;color:#8B8989"></i>
                  </el-col>
                </el-row>
                <el-row>吓到自己了！</el-row>
                <el-row style="font-size:12px;color:#8B8989;min-height:50px">
                  凌晨突然见红了，吓得马上穿衣服上医院，做了检查大夫让回家观察继续吃保胎药，出血量大了再来，我这小心脏扑通扑通吓得不行，
                  宝宝别吓妈妈，咱好好的长大
                </el-row>
                <hr style="border: 1px solid #EEE9E9" />
                <el-row style="margin-top:10px">
                  <el-col :span="8" style="text-align:center;color:#8B8989">
                    <i class="iconfont iconzhuanfa" style="font-size:20px"></i>&nbsp;转发
                  </el-col>
                  <el-col :span="8" style="text-align:center;color:#8B8989">
                    <i class="iconfont iconpinglun1" style="font-size:20px"></i>&nbsp;12
                  </el-col>
                  <el-col :span="8" style="text-align:center;color:#8B8989">
                    <i class="iconfont icondianzan3"></i>&nbsp;13
                  </el-col>
                </el-row>
              </el-row>
              <el-row class="block">
                <el-row>
                  <el-col :span="2">
                    <img :src="'/api/res/pkms_avatar/1037.jpg'" style="width:50px;width:50px;border-radius:50%">
                  </el-col>
                  <el-col :span="14">
                    <el-row style="font-size:15px;padding-top:5px;color:#8B8989">家有三宝</el-row>
                    <el-row style="font-size:12px;padding-top:5px;color:#8B8989">育龄11年</el-row>
                  </el-col>
                  <el-col :span="7" style="text-align:right;margin-top:15px">
                    <el-button size="mini" round plain>关注</el-button>
                  </el-col>
                  <el-col :span="1" style="text-align:right;margin-top:16px">
                    <i class="iconfont iconiconset0127" style="font-size:10px;color:#8B8989"></i>
                  </el-col>
                </el-row>
                <el-row>预产期5.7已在4.27超快顺产蒙牛一枚</el-row>
                <el-row style="font-size:12px;color:#8B8989;min-height:50px">
                  27号三四点有感觉假宫缩但肚子不痛后面拿出手机记录宫缩时间频繁三五分钟就去医院了，经过一系列检查开俩指、多走走在检查六指了，
                  推产房用三四次力孩子就出来了，简直太舒服了哈哈没有侧切没有缝针压肚子也能接受.拿出勇气顺产没有那么可怕的分享怀俩胎男宝症状早期
                </el-row>
                <hr style="border: 1px solid #EEE9E9" />
                <el-row style="margin-top:10px">
                  <el-col :span="8" style="text-align:center;color:#8B8989">
                    <i class="iconfont iconzhuanfa" style="font-size:20px"></i>&nbsp;转发
                  </el-col>
                  <el-col :span="8" style="text-align:center;color:#8B8989">
                    <i class="iconfont iconpinglun1" style="font-size:20px"></i>&nbsp;24
                  </el-col>
                  <el-col :span="8" style="text-align:center;color:#8B8989">
                    <i class="iconfont icondianzan3"></i>&nbsp;3
                  </el-col>
                </el-row>
              </el-row>
              <el-row class="block">
                <el-row>
                  <el-col :span="2">
                    <img :src="'/api/res/pkms_avatar/1038.jpg'" style="width:50px;width:50px;border-radius:50%">
                  </el-col>
                  <el-col :span="14">
                    <el-row style="font-size:15px;padding-top:5px;color:#8B8989">乐观主义者</el-row>
                    <el-row style="font-size:12px;padding-top:5px;color:#8B8989">育龄2年</el-row>
                  </el-col>
                  <el-col :span="7" style="text-align:right;margin-top:15px">
                    <el-button size="mini" round plain>关注</el-button>
                  </el-col>
                  <el-col :span="1" style="text-align:right;margin-top:16px">
                    <i class="iconfont iconiconset0127" style="font-size:10px;color:#8B8989"></i>
                  </el-col>
                </el-row>
                <el-row>已儿女双全，愿一切安好！</el-row>
                <el-row style="font-size:12px;color:#8B8989;min-height:50px">
                  大龄自然受孕，NT1.6 胎心164的男宝宝愿宝宝健健康康来到这个世界，期待……
                </el-row>
                <hr style="border: 1px solid #EEE9E9" />
                <el-row style="margin-top:10px">
                  <el-col :span="8" style="text-align:center;color:#8B8989">
                    <i class="iconfont iconzhuanfa" style="font-size:20px"></i>&nbsp;转发
                  </el-col>
                  <el-col :span="8" style="text-align:center;color:#8B8989">
                    <i class="iconfont iconpinglun1" style="font-size:20px"></i>&nbsp;14
                  </el-col>
                  <el-col :span="8" style="text-align:center;color:#8B8989">
                    <i class="iconfont icondianzan3"></i>&nbsp;23
                  </el-col>
                </el-row>
              </el-row>
            </el-row>
            <el-row></el-row>
            <el-row></el-row>
          </el-tab-pane>
          <el-tab-pane label="热议话题" name="second">
            <el-row style="margin-left:10px">今日热议话题<el-tag type="danger" size="mini">榜单</el-tag></el-row>
            <el-row style="margin:10px 10px">
              <el-row class="block">
                <el-col :span="4">
                  <img src="../../assets/img/topic1.jpg" style="width:115px;height:115px;border-radius:8px"/>
                  <i class="iconfont icondiyi1 pos"  style="color:#FFD700;font-size:20px"></i>
                </el-col>
                <el-col :span="8">
                  <el-row style="margin-top:0px">#2021的母亲节告白#</el-row>
                  <el-row style="color:#f00;font-size:10px;margin-top:12px">
                    <i class="iconfont iconremen"></i>&nbsp;68.2w
                  </el-row>
                  <el-row style="color:#8B8989;font-size:10px;margin-top:12px">
                    12.4万育友热议中
                  </el-row>
                  <el-row style="color:#8B8989;margin-top:12px">
                    <img :src="'/api/res/pkms_avatar/1027.jpg'" style="width:20px;height:20px;border-radius:50%" />
                    <img :src="'/api/res/pkms_avatar/1029.jpg'" style="width:20px;height:20px;border-radius:50%" />
                    <img :src="'/api/res/pkms_avatar/1037.jpg'" style="width:20px;height:20px;border-radius:50%" />
                    <i class="iconfont iconmore"></i>
                  </el-row>
                </el-col>
                <el-col :span="12" style="background:#EEE9E9;margin-top:10px;padding:10px 10px 0px 10px;border-radius:5px;font-size:10px">
                  <el-row style="padding-bottom:10px">
                    <el-tag type="warning" size="mini">精华</el-tag>
                    &nbsp;当妈妈是一场修行，我愿意倾其一生
                  </el-row>
                  <el-row style="padding-bottom:10px">
                    <el-tag type="warning" size="mini">精华</el-tag>
                    &nbsp;记忆碎片————我的妈妈
                  </el-row>
                  <el-row style="padding-bottom:10px">
                    <el-tag type="danger" size="mini">热帖</el-tag>
                    &nbsp;简单的幸福
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="block">
                <el-col :span="4">
                  <img src="../../assets/img/topic2.jpg" style="width:115px;height:115px;border-radius:8px"/>
                  <i class="iconfont icondier pos"  style="color:#8B8B83;font-size:20px"></i>
                </el-col>
                <el-col :span="8">
                  <el-row style="margin-top:0px">#生二胎注意事项#</el-row>
                  <el-row style="color:#f00;font-size:10px;margin-top:12px">
                    <i class="iconfont iconremen"></i>&nbsp;53.4w
                  </el-row>
                  <el-row style="color:#8B8989;font-size:10px;margin-top:12px">
                    10.4万育友热议中
                  </el-row>
                  <el-row style="color:#8B8989;margin-top:12px">
                    <img :src="'/api/res/pkms_avatar/1028.jpg'" style="width:20px;height:20px;border-radius:50%" />
                    <img :src="'/api/res/pkms_avatar/1034.jpg'" style="width:20px;height:20px;border-radius:50%" />
                    <img :src="'/api/res/pkms_avatar/1039.jpg'" style="width:20px;height:20px;border-radius:50%" />
                    <i class="iconfont iconmore"></i>
                  </el-row>
                </el-col>
                <el-col :span="12" style="background:#EEE9E9;margin-top:10px;padding:10px 10px 0px 10px;border-radius:5px;font-size:10px">
                  <el-row style="padding-bottom:10px">
                    <el-tag type="danger" size="mini">热帖</el-tag>
                    &nbsp;一胎儿子，二胎检查又是儿子
                  </el-row>
                  <el-row style="padding-bottom:10px">
                    <el-tag type="warning" size="mini">精华</el-tag>
                    &nbsp;来还愿了，已生出健康男宝宝
                  </el-row>
                  <el-row style="padding-bottom:10px">
                    <el-tag type="danger" size="mini">热帖</el-tag>
                    &nbsp;儿女双全，幸福时光
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="block">
                <el-col :span="4">
                  <img src="../../assets/img/topic3.jpg" style="width:115px;height:115px;border-radius:8px"/>
                  <i class="iconfont icondisan pos"  style="color:#B8860B;font-size:20px"></i>
                </el-col>
                <el-col :span="8">
                  <el-row style="margin-top:0px">#妈妈的快乐你想象不到#</el-row>
                  <el-row style="color:#f00;font-size:10px;margin-top:12px">
                    <i class="iconfont iconremen"></i>&nbsp;48.0w
                  </el-row>
                  <el-row style="color:#8B8989;font-size:10px;margin-top:12px">
                    9.6万育友热议中
                  </el-row>
                  <el-row style="color:#8B8989;margin-top:12px">
                    <img :src="'/api/res/pkms_avatar/1029.jpg'" style="width:20px;height:20px;border-radius:50%" />
                    <img :src="'/api/res/pkms_avatar/1031.jpg'" style="width:20px;height:20px;border-radius:50%" />
                    <img :src="'/api/res/pkms_avatar/1045.jpg'" style="width:20px;height:20px;border-radius:50%" />
                    <i class="iconfont iconmore"></i>
                  </el-row>
                </el-col>
                <el-col :span="12" style="background:#EEE9E9;margin-top:10px;padding:10px 10px 0px 10px;border-radius:5px;font-size:10px">
                  <el-row style="padding-bottom:10px">
                    <el-tag type="danger" size="mini">热帖</el-tag>
                    &nbsp;整理房间收拾家务
                  </el-row>
                  <el-row style="padding-bottom:10px">
                    <el-tag type="danger" size="mini">热帖</el-tag>
                    &nbsp;好想有属于自己的时间
                  </el-row>
                  <el-row style="padding-bottom:10px">
                    <el-tag type="danger" size="mini">热帖</el-tag>
                    &nbsp;笑起来真可爱
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="block">
                <el-col :span="4">
                  <img src="../../assets/img/topic4.jpg" style="width:115px;height:115px;border-radius:8px"/>
                  <i class="iconfont iconpaimingbiaoqian pos"  style="color:#BEBEBE;font-size:20px"></i>
                  <span class="pos" style="color:#fff;margin-left:6px;font-size:10px">4</span>
                </el-col>
                <el-col :span="8">
                  <el-row style="margin-top:0px">#宝宝睡觉不踏实怎么办#</el-row>
                  <el-row style="color:#f00;font-size:10px;margin-top:12px">
                    <i class="iconfont iconremen"></i>&nbsp;46.1w
                  </el-row>
                  <el-row style="color:#8B8989;font-size:10px;margin-top:12px">
                    8.6万育友热议中
                  </el-row>
                  <el-row style="color:#8B8989;margin-top:12px">
                    <img :src="'/api/res/pkms_avatar/1039.jpg'" style="width:20px;height:20px;border-radius:50%" />
                    <img :src="'/api/res/pkms_avatar/1031.jpg'" style="width:20px;height:20px;border-radius:50%" />
                    <img :src="'/api/res/pkms_avatar/1051.jpg'" style="width:20px;height:20px;border-radius:50%" />
                    <i class="iconfont iconmore"></i>
                  </el-row>
                </el-col>
                <el-col :span="12" style="background:#EEE9E9;margin-top:10px;padding:10px 10px 0px 10px;border-radius:5px;font-size:10px">
                  <el-row style="padding-bottom:10px">
                    <el-tag type="danger" size="mini">热帖</el-tag>
                    &nbsp;让宝宝好好睡觉的方法
                  </el-row>
                  <el-row style="padding-bottom:10px">
                    <el-tag type="danger" size="mini">热帖</el-tag>
                    &nbsp;退圈啦，我的乔治
                  </el-row>
                  <el-row style="padding-bottom:10px">
                    <el-tag type="warning" size="mini">精华</el-tag>
                    &nbsp;【知识分享】1~12个月宝宝睡眠规律
                  </el-row>
                </el-col>
              </el-row>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="热门问答" name="third">
            <el-row style="margin:10px" v-for="index in 10" :key="index">
              <el-row class="block">
                <el-row>
                  <el-col :span="1">
                    <img :src="'/api/res/pkms_avatar/1027.jpg'" style="width:28px;height:28px;border-radius:50%" />
                  </el-col>
                  <el-col :span="4" style="font-size:10px;margin-top:6px;margin-left:2px">
                    冰雪聪明的小虫纸
                  </el-col>
                  <el-col :span="9" style="font-size:10px;margin-top:6px;color:#8B8989">
                    孕15周2天
                  </el-col>
                  <el-col :span="9" style="font-size:10px;margin-top:6px;color:#8B8989;text-align:right">
                    <el-button size="mini" type="primary" style="width:100px"><i class="iconfont iconhuida" style="font-size:10px"></i>&nbsp;写回答</el-button>
                  </el-col>
                </el-row>
                <el-row> 12周心率168，医生说是正常的......</el-row>
                <el-row style="font-size:12px;margin-top:5px">
                  <el-tag type="success" effect="dark" size="mini" >答</el-tag>
                  你好，你这个检查结果应该是比较偏高的，建议还是等到2点多再去做个复查。
                </el-row>
                <el-row style="font-size:10px;margin-top:6px;color:#8B8989">
                  <el-col :span="2">4回答</el-col>
                  <el-col :span="22" style="text-align:right">
                    <i class="iconfont iconiconset0127" style="font-size:8px"></i>
                  </el-col>
                </el-row>
              </el-row>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="right">
        <el-card shadow="hover" :body-style="{background: 'rgba(255, 0, 0, 0)', margin: '0px'}">
          <el-row style="font-size:10px">
            <el-col :span="8" style="text-align:center;">
              <el-row style="margin-bottom:5px">
                <el-button type="primary" size="small" circle plain><i class="iconfont icontiwen" style="font-size:25px"></i></el-button>
              </el-row>
              <el-row>提问</el-row>
            </el-col>
            <el-col :span="8"  style="text-align:center">
              <el-row style="margin-bottom:5px">
                <el-button type="warning" size="small" circle plain><i class="iconfont iconfabu2" style="font-size:25px"></i></el-button>
              </el-row>
              <el-row>发帖</el-row>
            </el-col>
            <el-col :span="8"  style="text-align:center">
              <el-row style="margin-bottom:5px">
                <el-button type="success" size="small" circle plain><i class="iconfont iconshipin" style="font-size:25px"></i></el-button>
              </el-row>
              <el-row>视频</el-row>
            </el-col>
          </el-row>
          <hr style="border: 1px solid #F5F5F5;margin:10px 0px;" />
          <el-row style="font-size:10px;color:#8B8989">
            <el-col :span="12"  style="text-align:center;">稍候答</el-col>
            <el-col :span="12"  style="text-align:center">草稿箱</el-col>
          </el-row>
        </el-card>
        <el-card shadow="hover" style="margin-top:5px;font-size:10px;padding-bottom:10px" :body-style="{ padding: '0px' }" >
          <el-row style="padding:5px 0px 0px 10px;">
            <el-col :span="12"><i class="iconfont iconmind-full" style="font-size:20px;color:#8B8989"></i>&nbsp;创作中心</el-col>
            <el-col :span="11" style="text-align:right;padding-top:5px"><i class="iconfont iconjiantou" style="font-size:15px;color:#8B8989"></i></el-col>
          </el-row>
          <hr style="border: 1px solid #F5F5F5" />
          <el-row style="text-align:center;color:#BEBEBE;padding:10px 10px">
            <el-col :span="11" style="text-align:center">
              <el-row>今日提问数</el-row>
              <el-row>12</el-row>
            </el-col>
            <el-col :span="2">
              <div style="float:left;width: 1px;height: 40px; background: #e5e5e5;"></div>
            </el-col>
            <el-col :span="10" style="text-align:center">
              <el-row>今日回答问题数</el-row>
              <el-row>2</el-row>
            </el-col>
          </el-row>
          <hr style="border: 1px solid #F5F5F5" />
          <el-row style="color:#BEBEBE;padding:5px 10px 0px 20px" >
            <el-col :span="21"><i class="iconfont iconchangjianwenti"></i>&nbsp;我关注的问题</el-col>
            <el-col :span="3"><el-tag effect="plain" type="info" size="mini">2</el-tag></el-col>
          </el-row>
          <el-row style="color:#BEBEBE;padding:15px 10px 10px 20px">
            <el-col :span="21"><i class="iconfont iconyaoqingzhaobiao" style=""></i>&nbsp;我的邀请</el-col>
            <el-col :span="3"><el-tag effect="plain" type="info"  size="mini">0</el-tag></el-col>
          </el-row>
        </el-card>
        <el-card shadow="hover" style="margin-top:5px;font-size:10px;color:#fff;border-radius:10px" :body-style="{ padding: '0px 10px 20px 10px', background: '#409EFF', margin: '0px' }" >
          <el-row style="padding:5px 0px 0px 0px;">
            <el-col :span="6">知识竞答&nbsp;<i class="iconfont iconduizhan2x" style="font-size:16px;color:#FF8C00"></i></el-col>
            <el-col :span="8" style="margin-left:55px;font-size:15px">1vs1</el-col>
            <el-col :span="5" style="text-align:right">规则说明</el-col>
          </el-row>
          <hr style="border: 1px solid #EEE9E9;padding:0px 20px" />
          <el-row style="text-align:center;margin-top:20px">
            <el-row>
              <img :src="'/api/res/pkms_avatar/' + sysUser.photo" style="width:50px;height:50px;border-radius:50%;border:2px solid #fff" />
            </el-row>
            <el-row>
              {{sysUser.username}}&nbsp;<el-tag size="mini" type="danger" effect="dark">擂 主</el-tag>
            </el-row>
          </el-row>
          <el-row style="margin-top:20px">
            <el-col :span="12">
              <el-row style="background:rgba(0, 0, 0, 0.4);height:120px;width:120px;border-radius:10px;margin-left:15px;text-align:center">
                <el-row style="margin-top:25px">
                  <el-button style="width:50px;height:50px" circle><i class="iconfont iconjia" style="font-size:20px"></i></el-button>
                </el-row>
                <el-row style="margin-top:5px">邀请好友</el-row>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row style="background:rgba(0, 0, 0, 0.4);height:120px;width:120px;border-radius:10px;margin-left:10px;text-align:center">
                <el-row style="margin-top:25px">
                  <el-button style="width:50px;height:50px" circle><i class="iconfont iconrepeat" style="font-size:20px"></i></el-button>
                </el-row>
                <el-row style="margin-top:5px">随机匹配</el-row>
              </el-row>
            </el-col>
          </el-row>
          <el-row style="text-align:center;margin-top:25px">
            <el-button type="danger"  style="width:200px" disabled round>开始对战</el-button>
          </el-row>
        </el-card>
        <el-card shadow="hover" style="margin-top:5px;font-size:10px;padding-bottom:10px" :body-style="{ padding: '0px' }" >
          <el-row style="padding:5px 0px 0px 10px;">为你推荐&nbsp;<i class="iconfont icontuijian" style="font-size:16px;color:#1E90FF"></i></el-row>
          <hr style="border: 1px solid #F5F5F5" />
          <el-row style="text-align:center;color:#BEBEBE">暂无推荐</el-row>
        </el-card>
        <el-card shadow="hover" style="margin-top:5px;font-size:10px;padding-bottom:10px" :body-style="{ padding: '0px' }" >
          <el-row style="padding:5px 0px 0px 10px;">人气问题&nbsp;<i class="iconfont iconremen1" style="font-size:18px;color:#FF0000"></i></el-row>
          <hr style="border: 1px solid #F5F5F5" />
          <el-row style="text-align:center;color:#BEBEBE">暂无</el-row>
        </el-card>
        <el-card shadow="hover" style="margin-top:5px;font-size:10px;padding-bottom:10px" :body-style="{ padding: '0px' }" >
          <el-row style="padding:5px 0px 0px 10px;">最新问题&nbsp;<i class="iconfont icontubiaozuixin01" style="font-size:16px;color:#00CD66"></i></el-row>
          <hr style="border: 1px solid #F5F5F5" />
          <el-row style="text-align:center;color:#BEBEBE">暂无</el-row>
        </el-card>
        <el-card shadow="hover" style="margin-top:5px;font-size:10px;padding-bottom:10px" :body-style="{ padding: '0px' }" >
          <el-row style="padding:5px 0px 0px 10px;">邀你回答&nbsp;<i class="iconfont iconyaoqinghuida" style="font-size:16px;color:#FFD700"></i></el-row>
          <hr style="border: 1px solid #F5F5F5" />
          <el-row style="text-align:center;color:#BEBEBE">暂无</el-row>
        </el-card>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'first',
      sysUser: JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
  watch: {
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    mouseOver () {
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}

</script>

<style lang="less" scoped>
.all {
    position: relative;
    top:15.8%;
    // background-color: #ff0000;
    // opacity: 0.5;
    background-color: #F5F5F5;
    width: 100%;
    height: 200%;
    display:flex;
    justify-content:center;
    min-height: 662px;
  }
.left{
    width: 0%;
    position: relative;
    // background-color: rgba(255, 145, 0, 1);
    left: -1%;
    margin-top: 10px;
    background-color: rgba(145, 255, 0, 0);
  }
  .center {
    margin-top: 10px;
    padding: 0px 10px;
    width: 50%;
    position: relative;
    left: 0%;
    // background-color: #00ff2a;
    // opacity: 0.5;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .right{
    width: 20%;
    position: relative;
    // background-color: rgba(2, 217, 255, 1);
    background-color: rgba(145, 255, 0, 0);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0);
    left: 1%;
    margin-top: 10px;
    padding: 0px;
  }
  .annual-box{
    display: flex;
    margin: 10px 0px 0px 0px;
    flex-wrap: wrap;
    color: #fff;
    font-size: 12px;
    font-family: '微软雅黑';
    justify-content: space-around;
  }
  .annual{
    width:105px;
    background-size: 100% 100% !important;
    border: 0px;
    border-radius: 12px;
  }
  .more{
    width:50px;
    background-color: rgba(165, 42, 42, 0);
    border: 0px;
    border-radius: 12px;
  }
  .bg{
    position: absolute;
    top: 0px;
    border-radius: 12px;
    opacity: 0.4;
    filter: blur(4px);
  }
  .bg2{
    position: absolute;
    background-color: rgba(255, 112, 112, 0.5);
    // background-color: rgb(27, 145, 255);
    top: 0px;
    border-radius: 12px;
  }
  .block{
    padding: 10px 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .pos{
    position: absolute;
    top: 0%;
    left: 0%;
  }
</style>
