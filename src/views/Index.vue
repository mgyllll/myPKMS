<template>
  <div>
    <el-container class="main_container">
      <el-drawer
      :visible.sync="drawer"
      :with-header="false"
      size="50%">
      <div id="app">
        <div class="sidebar">
          <card></card>
          <list></list>
        </div>
        <div class="main">
          <message></message>
          <usertext></usertext>
        </div>
      </div>
    </el-drawer>
      <!-- 头部布局 -->
      <el-header>
        <!-- LOGO和项目名称 -->
        <span class="logo">
          <img style="width:4%" src="../assets/img/logo0418.png" />
        </span>
         <span  class="biaoti">育儿个人知识管理系统</span>
        <div class="navMenu">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true">
            <el-menu-item
              :disabled="false"
              :index="'/UserHome'"
              @click="'/UserHome'"
              :route="'/UserHome'"
              :key="1" >
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">我的育儿知识</template>
              <el-menu-item
                :disabled="false"
                :index="'/Upload'"
                @click="'/Upload'"
                :route="'/Upload'"
                :key="301">
                <span slot="title">育儿知识上传</span>
              </el-menu-item>
              <el-menu-item
                :disabled="false"
                :index="'/Management'"
                @click="'/Management'"
                :route="'/Management'"
                :key="302" >
                <span slot="title">育儿知识管理</span>
              </el-menu-item>
              <el-menu-item
                :disabled="false"
                :index="'/Mapping'"
                @click="'/Mapping'"
                :route="'/Mapping'"
                :key="303" >
                <span slot="title">育儿知识词云</span>
              </el-menu-item>
              <el-menu-item
                :disabled="false"
                :index="'/Auditing'"
                @click="'/Auditing'"
                :route="'/Auditing'"
                :key="304" >
                <span slot="title">育儿知识审核</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item
              :disabled="false"
              :index="'/Community'"
              @click="'/Community'"
              :route="'/Community'"
              :key="4" >
              <span slot="title">育儿知识共享社区</span>
            </el-menu-item>
            <el-menu-item
              :disabled="false"
              :index="'/AboutUs'"
              @click="'/AboutUs'"
              :route="'/AboutUs'"
              :key="5" >
              <span slot="title">育儿知识结构图</span>
            </el-menu-item>
          </el-menu>
        </div>
        <span class="welcome">
          <el-button icon="el-icon-bell" type="text" @click="chat"></el-button>
          <span >
            <el-link @click="toPersonal(user.userID)" style="color:#fff" :underline="false">
              欢迎：{{userName}}
            </el-link>
          </span>
        </span>
        <!-- 用户登录展示头像 -->
        <div class="right_box">
          <el-dropdown @command="handleCommand">
            <img v-if="user.photo !=='' " :src="'/api/res/pkms_avatar/' + user.photo" :alt="userName" >
            <img v-else src="../assets/img/dinosaur.jpg" :alt="userName" >
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="fa fa-address-card-o" command="userInfo" style="font-size:13px">个人中心</el-dropdown-item>
              <el-dropdown-item icon="fa fa-cog" command="setting" style="font-size:13px">设置</el-dropdown-item>
              <el-dropdown-item icon="fa fa-sign-out" command="logout" style="font-size:13px">注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <div class='homeWelcome' v-if="this.$router.currentRoute.path=='/Index'" >
          <video  :preload="preload"
                :poster="videoImg"
                :height="height"
                :width="width"
                align="center"
                :controls="controls"
                :loop="loop"
                :autoplay="autoplay"
                style="margin:0px;padding:0px"
                >
          <source :src="'/api/res/openVideo/baby5.mp4'" type="video/mp4">
        </video>
        <span class="topic">欢迎来到育儿个人知识管理系统</span>
        </div>
        <router-view>
        </router-view>
      </el-main>
    </el-container>
    <el-drawer
      title="个人中心"
      :with-header="false"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      size="25%"
      :wrapperClosable="false"
      >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <i  class="iconfont iconjiantou-copy" @click="dialog = !dialog"></i>
          <span>个人中心</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="editUser">编辑资料</el-button>
        </div>
        <div class="text item" style="padding:0px;margin:0px">
          <div>
            <div class="uAvatar">
              <el-upload
                class="avatar-uploader"
                :action="'/api/sys/upload/uploadAvatar'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="this.userPhoto !=='' " :src="'/api/res/pkms_avatar/' + this.userPhoto" :alt="this.userName" class="avatar" >
                <img v-else src="../assets/img/dinosaur.jpg" :alt="this.userName" class="avatar">
              </el-upload>
            </div>
            <div class="uInfo" >
              <div style="margin:0px;padding:0px">
                <el-link @click="toPersonal(self.userID)" style="color:#000" :underline="false">
                  {{self.username}}
                </el-link>
                <el-tag v-if="self.gender == '男'" size="mini">宝爸</el-tag>
                <el-tag v-else type="danger" size="mini">宝妈</el-tag>
              </div>
              <div style="font-size:10px;color:#a7a7a7;"><el-button type="text"><i class="iconfont iconbianji"></i></el-button>这个人很神秘，什么都没有写</div>
            </div>
          </div>
          <div style="margin-top:10px">
            <span>{{self.original}}</span><span style="color:#a7a7a7;font-size:12px;margin-left:4px" >创作</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{self.fans}}</span><span style="color:#a7a7a7;font-size:12px;margin-left:4px" >粉丝</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{self.countFollows}}</span><span style="color:#a7a7a7;font-size:12px;margin-left:4px">关注</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{self.readingQuantity}}</span><span style="color:#a7a7a7;font-size:12px;margin-left:4px">访客</span>
            <el-divider direction="vertical"></el-divider>
            <span>22</span><span style="color:#a7a7a7;font-size:12px;margin-left:4px">积分</span>
          </div>
        </div>
      </el-card>
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
          @close="handleClose">
          <el-menu-item index="1">
            <i class="iconfont iconqianbao" style="margin-left:4px"></i>
            <span slot="title" style="margin-left:8px">我的钱包</span>
          </el-menu-item>
          <el-menu-item index="2" @click="trackRecord">
            <i class="iconfont iconbaobao1" style="margin-left:2px;font-size:22px"></i>
            <span slot="title" style="margin-left:5px">成长档案</span>
          </el-menu-item>
          <el-menu-item index="3" @click="vaccineRecord">
            <i class="iconfont iconertongyimiao" style="margin-left:1px;font-size:23px"></i>
            <span slot="title" style="margin-left:6px">宝宝疫苗</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="iconfont iconnaiping" style="margin-left:2px;font-size:20px"></i>
            <span slot="title" style="margin-left:8px">喂养记录</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="iconfont iconziyuan" style="margin-left:2px;font-size:20px"></i>
            <span slot="title" style="margin-left:8px">孕育日记</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="iconfont iconinsurance" style="margin-left:1px;font-size:23px"></i>
            <span slot="title" style="margin-left:6px">儿童保险</span>
          </el-menu-item>
        </el-menu>
        <el-drawer
          ref="innerDrawer"
          :with-header="false"
          title="我是里面的"
          size="20%"
          :wrapperClosable="false"
          :append-to-body="true"
          :visible.sync="innerDrawer"
          :before-close="beforeClose2">
          <el-row style="padding:15px 0px;background-color:#F5F5F5">
            <el-col :span="2" style="text-align:center;color:#696969;"><i class="iconfont iconjiantou-copy" @click="closeDrawer()" ></i></el-col>
            <el-col :span="22" style="text-align:center;color:#696969;">个人信息</el-col>
          </el-row>
          <el-row style="padding:20px 0px;border-top:1px solid #CDCDC1;">
              <el-col :span="6" style="color:#696969;margin-left:15px;font-size:14px">姓名</el-col>
              <el-col :span="16" style="text-align:right">
                <el-button type="text" style="padding:0px;color:#BEBEBE" @click="editPerson('姓名')" >
                {{user.userName}}
                <i class="iconfont iconjiantou" ></i>
                </el-button>
              </el-col>
          </el-row>
          <el-row style="padding:20px 0px;border-top:1px solid #DCDFE6;">
              <el-col :span="6" style="color:#696969;margin-left:15px;font-size:14px">性别</el-col>
              <el-col :span="16" style="text-align:right">
                <el-button type="text" style="padding:0px;color:#BEBEBE" @click="editPerson('性别')">
                {{user.gender}}
                <i class="iconfont iconjiantou" ></i>
                </el-button>
              </el-col>
          </el-row>
          <el-row style="padding:20px 0px;border-top:1px solid #DCDFE6;">
              <el-col :span="6" style="color:#696969;margin-left:15px;font-size:14px">生日</el-col>
              <el-col :span="16" style="text-align:right;color:#BEBEBE">
                <el-date-picker
                  @change="changeDate"
                  v-model="user.birthDate"
                  type="date"
                  size="mini"
                  :clearable="false"
                  style="width:123px;"
                  align="right"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
                <i class="iconfont iconjiantou" ></i>
              </el-col>
          </el-row>
          <el-row style="padding:20px 0px;border-top:1px solid #DCDFE6;">
              <el-col :span="6" style="color:#696969;margin-left:15px;font-size:14px">手机号</el-col>
              <el-col :span="16" style="text-align:right">
                <el-button type="text" style="padding:0px;color:#BEBEBE" @click="editPerson('手机号')">
                {{user.phone}}
                <i class="iconfont iconjiantou" ></i>
                </el-button>
              </el-col>
          </el-row>
          <el-row style="padding:20px 0px;border-top:1px solid #DCDFE6;">
              <el-col :span="6" style="color:#696969;margin-left:15px;font-size:14px">邮箱</el-col>
              <el-col :span="16" style="text-align:right">
                <el-button type="text" style="padding:0px;color:#BEBEBE" @click="editPerson('邮箱')">
                {{user.email}}
                <i class="iconfont iconjiantou" ></i>
                </el-button>
              </el-col>
          </el-row>
          <el-row style="padding:20px 0px;border-top:1px solid #DCDFE6;">
              <el-col :span="6" style="color:#696969;margin-left:15px;font-size:14px" >QQ号</el-col>
              <el-col :span="16" style="text-align:right">
                <el-button type="text" style="padding:0px;color:#BEBEBE" @click="editPerson('QQ号')">
                {{user.qq}}
                <i class="iconfont iconjiantou" ></i>
                </el-button>
              </el-col>
          </el-row>
          <el-row style="padding:20px 0px;border-top:1px solid #DCDFE6;">
              <el-col :span="6" style="color:#696969;margin-left:15px;font-size:14px">微信</el-col>
              <el-col :span="16" style="text-align:right">
                <el-button type="text" style="padding:0px;color:#BEBEBE" @click="editPerson('微信')">
                {{user.weChat}}
                <i class="iconfont iconjiantou" ></i>
                </el-button>
              </el-col>
          </el-row>
          <el-row style="padding:20px 0px;border-top:1px solid #DCDFE6;">
              <el-col :span="6" style="color:#696969;margin-left:15px;font-size:14px">更多</el-col>
              <el-col :span="16" style="text-align:right">
                <el-button type="text" style="padding:0px;color:#BEBEBE">
                <i class="iconfont iconjiantou" ></i>
                </el-button>
              </el-col>
          </el-row>
          <el-collapse-transition>
            <div class="usernameEdit" v-show="showPerson">
              <el-row :gutter="20">
                <el-col :span="5" style="margin-left:10px">
                  <el-button type="text" @click="cancel(settingTitle)" style="color:#000;margin:15px 0px 0px 0px;padding:0px">取消</el-button>
                </el-col>
                <el-col :span="12" style="text-align:center;margin-top:10px">设置{{settingTitle}}</el-col>
                <el-col :span="5" style="margin-top:10px">
                  <el-button type="success" size="mini" @click="done(settingTitle)">完成</el-button>
                </el-col>
              </el-row>
              <el-row v-if="settingTitle == '姓名'" :gutter="20">
                <el-col :span="24" style="text-align:center;margin-top:10px">
                  <el-input
                    v-model="user.userName"
                    clearable
                    :disabled="true">
                  </el-input>
                </el-col>
              </el-row>
              <el-row v-else-if="settingTitle == '性别'" :gutter="20">
                <el-col :span="24" style="text-align:center;margin-top:10px">
                  <el-cascader-panel size="mini"  v-model="sex" :options="sexOptions" style="width:100%;height:80px"></el-cascader-panel>
                </el-col>
              </el-row>
              <el-row v-else-if="settingTitle == '手机号'" :gutter="20">
                <el-col :span="24" style="text-align:center;margin-top:10px">
                  <el-input
                    v-model="user.phone"
                    clearable>
                  </el-input>
                </el-col>
              </el-row>
              <el-row v-else-if="settingTitle == '邮箱'" :gutter="20">
                <el-col :span="24" style="text-align:center;margin-top:10px">
                  <el-input
                    v-model="user.email"
                    clearable>
                  </el-input>
                </el-col>
              </el-row>
              <el-row v-else-if="settingTitle == 'QQ号'" :gutter="20">
                <el-col :span="24" style="text-align:center;margin-top:10px">
                  <el-input
                    v-model="user.qq"
                    clearable>
                  </el-input>
                </el-col>
              </el-row>
              <el-row v-else-if="settingTitle == '微信'" :gutter="20">
                <el-col :span="24" style="text-align:center;margin-top:10px">
                  <el-input
                    v-model="user.weChat"
                    clearable>
                  </el-input>
                </el-col>
              </el-row>
            </div>
          </el-collapse-transition>
        </el-drawer>
    </el-drawer>
    <el-dialog title="成长档案" :visible.sync="archiveVisible" width="35%">
      <el-row v-show="archiveShow">
        <el-carousel :interval="1000" type="card" height="320px" indicator-position="none" :autoplay="false" arrow="never">
          <el-carousel-item v-for="(item, index) in archives" :key="index">
            <img :src="item.posterSrc" width="100%" height="100%">
            <img :src="require('../assets/img/openArchive.png')" width="60px" style="border-radius:50%" class="open" @click="openArc(item.NO)"/>
            <el-row class="baseInfo" style="text-align:center">
              <el-row style="color:#BEBEBE;margin-bottom:15px">NO.{{item.NO}}</el-row>
              <el-row style="margin-bottom:15px">
                <el-row>档案健康值</el-row>
                <el-row>
                  <el-rate
                    v-model="item.healthValue"
                    disabled
                    show-score
                    text-color="#ff0000">
                  </el-rate>
                </el-row>
              </el-row>
              <el-row>
                <el-col :span="12">姓名</el-col>
                <el-col :span="12">{{item.name}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">性别</el-col>
                <el-col :span="12">
                  <i v-if="item.gender === '男'" class="iconfont iconnv" style="color:#02e0ff"></i>
                  <i v-else class="iconfont iconnv" style="color:#fd01b3"></i>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">年龄</el-col>
                <el-col :span="12">{{item.age}}岁</el-col>
              </el-row>
            </el-row>
          </el-carousel-item>
        </el-carousel>
        <el-row style="text-align:center">
          <el-button type="success" size="small" round plain>添加档案</el-button>
        </el-row>
      </el-row>
      <el-row v-show="!archiveShow">
        <el-row><i class="iconfont iconreturn" @click="archiveShow = !archiveShow" style="font-size:20px"></i></el-row>
        <el-row style="text-align:center;font-size:10px" >
          <el-col :span="8">
            <el-row>
              <el-button type="success" circle plain>
                <i class="iconfont icondangan1defuben" style="font-size:25px"></i>
              </el-button>
            </el-row>
            <el-row style="margin-top:5px">成长测评</el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-button type="success" circle plain>
                <i class="iconfont iconshengaotizhong" style="font-size:25px"></i>
              </el-button>
            </el-row>
            <el-row style="margin-top:5px">身高体重</el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-button type="success" circle plain>
                <i class="iconfont iconziyuan70" style="font-size:25px"></i>
              </el-button>
            </el-row>
            <el-row style="margin-top:5px">疾病记录</el-row>
          </el-col>
        </el-row>
        <el-row>
          <div id="chartmain" style="width:500px; height: 300px;"></div>
        </el-row>
        <el-row>
          <el-col :span="2" style="color:#67C23A">
            Tips:
          </el-col>
          <el-col :span="18">
            <el-row><b>宝宝变化：</b>随着视觉能力的发展，开始能注视较远的活动物体。让我多接触外界，对大脑发育有好处。</el-row>
            <el-row><b>关爱提醒：</b>宝宝腹泻时应该如何调整辅食添加？快来看看，防患未然<el-link>>></el-link></el-row>
          </el-col>
          <el-col :span="4"><img src="../assets/img/tip.png" width="100%" /></el-col>
        </el-row>
        <el-row>
          <el-row style="font-size:18px"><b>身高体重</b></el-row>
          <el-row style="text-align:center;margin-top:10px">
            <el-col :span="6">
              <el-row><span style="color:#67C23A">-</span>cm</el-row>
              <el-row>当前身高</el-row>
            </el-col>
            <el-col :span="6">
              <el-row><span style="color:#67C23A">-</span>kg</el-row>
              <el-row>当前体重</el-row>
            </el-col>
            <el-col :span="6">
              <el-row><span style="color:#67C23A">-</span></el-row>
              <el-row>BMI</el-row>
            </el-col>
            <el-col :span="6">
              <el-row><span style="color:#67C23A">-</span></el-row>
              <el-row>身材</el-row>
            </el-col>
          </el-row>
          <el-row style="margin-top:5px"><el-tag type="success" size="mini">指导建议</el-tag></el-row>
          <el-row style="font-size:10px;margin-top:5px">各种数据是宝宝健康的晴雨表，一定要详细记录哦！</el-row>
        </el-row>
      </el-row>
    </el-dialog>
    <el-dialog title="疫苗时间表" :visible.sync="vaccineVisible" width="35%">
      <el-row style="margin-bottom:10px">开启提醒
        <el-switch
          v-model="remindValue"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-row>
      <div style="height:410px;overflow:auto">
        <el-row v-for="(item, index) in vaccineData" :key="index">
          <el-row>
            <el-col :span="1">
              <el-checkbox v-model="vaccineChecked"></el-checkbox>
            </el-col>
            <el-col :span="19">
              <el-row>{{item.vaccineName}}</el-row>
              <el-row style="font-size:10px;margin-top:5px">{{item.inoculationTime}}</el-row>
              <el-row style="color:#BEBEBE;font-size:10px;margin-top:5px">{{item.purpose}}</el-row>
            </el-col>
            <el-col :span="4">
              <el-tag size="mini" type="success" v-if="item.necessity == 1" effect="dark" style="margin:20px">必打</el-tag>
            </el-col>
          </el-row>
          <hr style="border: 1px solid #F5F5F5" />
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import card from '../components/chat/card.vue'
import list from '../components/chat/list.vue'
import message from '../components/chat/message.vue'
import usertext from '../components/chat/usertext.vue'
import * as echarts from 'echarts'
export default {
  name: 'index',
  activePath: '',
  data () {
    return {
      vaccineData: [],
      vaccineChecked: false,
      vaccineVisible: false,
      remindValue: false,
      archiveShow: true,
      archives: [
        {posterSrc: require('../assets/img/archive.png'), name: '陈怡', gender: '女', age: '5', NO: '2017333504023', healthValue: 4.8},
        {posterSrc: require('../assets/img/archive.png'), name: '陈奕迅', gender: '男', age: '1', NO: '2017333504024', healthValue: 4.9},
        {posterSrc: require('../assets/img/archive.png'), name: '李国庆', gender: '男', age: '7', NO: '2017333504025', healthValue: 4.5}
      ],
      archiveVisible: false,
      self: JSON.parse(window.sessionStorage.getItem('user')),
      editRes: 0,
      videoImg: '',
      playStatus: '',
      muteStatus: '',
      isMute: true,
      isPlay: true,
      width: '1536', // 设置视频播放器的显示宽度（以像素为单位）
      height: '660', // 设置视频播放器的显示高度（以像素为单位）
      preload: 'auto', //  建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
      controls: false, // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
      autoplay: true,
      loop: true, // 如果出现该属性，则当媒介文件完成播放后再次开始播放。
      drawer: false,
      beforeValue: '',
      settingTitle: '',
      sex: '',
      sexOptions: [{
        value: '男',
        label: '男'
      },
      {
        value: '女',
        label: '女'
      }
      ],
      showPerson: false,
      innerDrawer: false,
      dialog: false,
      loading: false,
      user: {
        userID: 0,
        username: '',
        userName: '',
        password: '',
        birthDate: '',
        gender: '男',
        phone: '',
        email: '',
        qq: '',
        weChat: '',
        address: '',
        native: [],
        detail: '',
        city: '',
        roleType: 0,
        photo: ''
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      timer: null,
      userPhoto: '',
      activeIndex: '1',
      userName: ''
    }
  },
  mounted () {
    // 连接WebSocket
    this.$store.dispatch('initData')
    this.$store.dispatch('connect')
    this.userName = window.sessionStorage.getItem('userName')
    this.userPhoto = JSON.parse(window.sessionStorage.getItem('user')).photo
    let oldUser = JSON.parse(window.sessionStorage.getItem('user'))
    this.user = {
      userID: oldUser.userID,
      userName: oldUser.username,
      password: '',
      birthDate: oldUser.birthDate,
      gender: oldUser.gender,
      phone: oldUser.phone,
      email: oldUser.email,
      qq: oldUser.qq,
      weChat: oldUser.weChat,
      address: oldUser.address,
      native: [],
      detail: '',
      city: oldUser.city,
      roleType: oldUser.roleType,
      photo: oldUser.photo
    }
    this.initVaccine()
  },
  created () {
  },
  components: {
    card,
    list,
    message,
    usertext
  },
  methods: {
    initVaccine () {
      this.$axios.get('/api/vaccine/vaccineTime').then(resp => {
        if (resp) {
          this.vaccineData = resp
        }
      })
    },
    vaccineRecord () {
      this.vaccineVisible = true
    },
    initChart () {
      // 指定图标的配置和数据
      var option = {
        title: {
          text: '成长测评'
        },
        tooltip: {},
        legend: {
          data: ['用户来源']
        },
        xAxis: {
          data: ['15天', '31天', '46天', '61天', '2月16天', '3月16天', '4月16天', '5月16天']
        },
        yAxis: {
        },
        series: [{
          name: 'BMI',
          type: 'line',
          color: '#67C23A',
          data: [15, 30, 42, 52, 51, 62, 62, 65]
        }]
      }
      // 初始化echarts实例
      var myChart = echarts.init(document.getElementById('chartmain'))

      // 使用制定的配置项和数据显示图表
      myChart.setOption(option)
    },
    openArc (name) {
      this.archiveShow = false
      this.initChart()
    },
    trackRecord () {
      this.archiveVisible = true
    },
    toPersonal (uid) {
      this.dialog = false
      this.$router.push({path: '/Personal', query: {uid: uid}}).catch(err => {
        console.log('输出报错', err)
      })
    },
    changeDate (newDate) {
      this.editRes = 1
    },
    chat () {
      this.$store.state.filterKey = ''
      this.$store.dispatch('initData')
      this.drawer = true
    },
    goChat () {
      this.$router.push('/FriendChat')
    },
    closeDrawer () {
      this.$refs.innerDrawer.closeDrawer()
      this.innerDrawer = false
    },
    done (type) {
      this.editRes = 1
      if (type === '性别') {
        this.user.gender = this.sex[0]
      }
      if (type === '姓名') {
        this.userName = this.user.userName
      }
      this.showPerson = false
    },
    cancel (type) {
      this.showPerson = false
      if (type === '姓名') {
        this.user.userName = this.beforeValue
      } else if (type === '性别') {
        this.user.gender = this.beforeValue
      } else if (type === '手机号') {
        this.user.phone = this.beforeValue
      } else if (type === '邮箱') {
        this.user.email = this.beforeValue
      } else if (type === 'QQ号') {
        this.user.qq = this.beforeValue
      } else if (type === '微信') {
        this.user.weChat = this.beforeValue
      }
      this.beforeValue = ''
    },
    beforeClose2 () {
      // console.log(this.user
      if (this.editRes === 1) {
        this.$axios.post('/api/system/user/', this.user).then(resp => {
          if (resp) {
            console.log(resp)
          }
        })
      }
      this.editRes = 0
    },
    editPerson (type) {
      this.sex = this.user.gender
      this.showPerson = true
      this.settingTitle = type
      if (type === '姓名') {
        this.beforeValue = this.user.userName
      } else if (type === '性别') {
        this.beforeValue = this.user.gender
      } else if (type === '手机号') {
        this.beforeValue = this.user.phone
      } else if (type === '邮箱') {
        this.beforeValue = this.user.email
      } else if (type === 'QQ号') {
        this.beforeValue = this.user.qq
      } else if (type === '微信') {
        this.beforeValue = this.user.weChat
      }
    },
    handleAvatarSuccess (res, file) {
      console.log(res.obj.filename)
      let oldUser = JSON.parse(window.sessionStorage.getItem('user'))
      oldUser.photo = res.obj.filename
      window.sessionStorage.setItem('user', JSON.stringify(oldUser))
      this.userPhoto = res.obj.filename
      this.user = {
        userID: oldUser.userID,
        userName: oldUser.username,
        password: '',
        birthDate: oldUser.birthDate,
        gender: oldUser.gender,
        phone: oldUser.phone,
        email: oldUser.email,
        qq: oldUser.qq,
        weChat: oldUser.weChat,
        address: oldUser.address,
        native: [],
        detail: '',
        city: oldUser.city,
        roleType: oldUser.roleType,
        photo: res.obj.filename
      }
      this.$axios.post('/api/system/user/', this.user).then(resp => {
        if (resp) {
          window.sessionStorage.setItem('user', JSON.stringify(this.user))
        }
      })
      console.log(this.user)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    editUser () {
      this.innerDrawer = true
    },
    handleClose (done) {
    },
    handleCommand (command) {
      if (command === 'logout') {
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 注销登录
          this.$axios.post('/api/logout')
          // 清空用户信息
          window.sessionStorage.removeItem('tokenStr')
          window.sessionStorage.removeItem('user')
          window.sessionStorage.removeItem('userName')
          // 跳转到登录
          this.$router.replace('/')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      }
      if (command === 'userInfo') {
        this.dialog = true
      }
      if (command === 'setting') {
        this.$message('click on item ' + command)
      }
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
// 头部布局
  .el-header {
    height: 20%;
    background-color: #545c64;
    padding: 0px;
    color: #ffffff;
    font-size: 20px;
    // 左边LOGO和标题
    .logo{
      position: relative;
      top: 0px;
      left: 10px;
    }
    // 标题
    .biaoti{
      font-family: '楷体';
      position: relative;
      top: -20px;
      left: 10px;
      }
      .navMenu{
        width: 502px;
        position: relative;
        top: -66.5px;
        left: 580px;
      }
    .welcome{
      position: relative;
      top: -115px;
      left: 1345px;
      font-size: 15px;
    }
    // 右边的登录头像
    .right_box{
      width: 20px;
      margin:  0px;
      position: relative;
      top: -171.5px;
      left: 1465px;
      .el-dropdown>img{
        width: 54px;
        height: 54px;
        border-radius: 50%;
        background-color: #ffffff;
        margin: 5px 0px 0px 0px;
        background-size: contain;
        }
    }
  }
  .el-main{
    background-color: #F5F5F5;
    height: 100%;
    padding: 0px;
    //overflow-y: scroll;
  }
  .el-footer {
    height: 20%;
    background-color: #545c64;
    display: flex;
    justify-content: space-between;
    padding: 0px;
    color: #ffffff;
    align-items: center;
    font-size: 20px;
  }
  .homeWelcome{
    margin: 0px;
    padding: 0px;
    height: 660px;
    text-align: center;
    font-size: 50px;
    font-family: '华文楷体';
    color: rgb(255, 112, 112);
    line-height: 660px;
    .topic{
      height: 50px;
      width: 700px;
      position: absolute;
      top:-10%;
      left: 27%;
    }
 }
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 400px;
  }
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 40px;
    margin-left: 0px;
  }
  .uInfo{
    position: absolute;
    right: 32%;
    top: 11.5%;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .usernameEdit{
    position: absolute;
    top:0%;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
  }
  .el-cascader-menu:last-child .el-cascader-node{
    width: 265px !important;
  }
  #app {
  margin: 0px auto;
  width: 770px;
  height: 721px;
  overflow: hidden;
  border-radius: 0px;
  .sidebar, .main {
    height: 100%;
  }
  .sidebar {
    float: left;
    color: #f4f4f4;
    background-color: #2e3238;
    width: 200px;
  }
  .main {
    position: relative;
    overflow: hidden;
    background-color: #eee;
  }
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: rgba(153, 169, 191, 0);
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: rgba(211, 220, 230, 0);
  }
  .open{
    position: absolute;
    top: 30px;
    left: 95px;
    padding: 0px;
    margin: 0px;
  }
  .baseInfo{
    position: absolute;
    top: 140px;
    left: 55px;
  }
</style>
