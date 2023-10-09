<template>
  <div class="detail">
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
    <div class="detail_left">
        <el-card shadow="hover">
          <el-row>
            <el-col :span="5">
              <el-link  type="info" style="color:#000" @click="toPersonal(statisticsData.userID)" :underline="false">
                <img v-if="statisticsData !== undefined  && statisticsData.photo !== undefined"
                        :src="'/api/res/pkms_avatar/' + statisticsData.photo"
                        :alt="statisticsData.userName" :title="statisticsData.userName"
                        style="width:45px;height:45px;border-radius:50%">
                <img v-else src="../../assets/img/logo1.jpg"
                      :alt="statisticsData.userName" :title="statisticsData.userName"
                      style="width:45px;height:45px">
              </el-link>
            </el-col>
            <el-col :span="19" style="font-size:10px">
              <el-row style="padding-top:5px">
                <el-link  type="info" style="color:#000" @click="toPersonal(statisticsData.userID)" :underline="false">
                  {{statisticsData.username}}
                </el-link>
                <i v-if="statisticsData.gender === '男'" class="iconfont iconnv" style="color:#02e0ff"></i>
                <i v-else class="iconfont iconnv" style="color:#fd01b3"></i>
              </el-row>
              <el-row style="padding-top:5px">
                <el-col :span="6" style="color:#BEBEBE">育龄8年</el-col>
                <el-col :span="18"><i class="iconfont iconVIP" style="color:#FFD700;font-size:15px;"></i>暂无认证</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row style="padding-top:15px;padding-bottom:10px;font-size:10px" >
            <el-col :span="4" style="text-align:center">
              <el-row>{{statisticsData.original}}</el-row>
              <el-row>原创</el-row>
            </el-col>
            <el-col :span="5" style="text-align:center">
              <el-row>33万+</el-row>
              <el-row>周排名</el-row>
            </el-col>
            <el-col :span="5" style="text-align:center">
              <el-row>71万+</el-row>
              <el-row>总排名</el-row>
            </el-col>
            <el-col :span="5" style="text-align:center">
              <el-row>{{statisticsData.readingQuantity}}</el-row>
              <el-row>访问</el-row>
            </el-col>
            <el-col :span="5" style="text-align:center">
              <el-row><i class="iconfont icondengji-D" style="color:#00EE00;font-size:15px;"></i></el-row>
              <el-row>等级</el-row>
            </el-col>
          </el-row>
          <hr style="border: 1px solid #F5F5F5" />
          <el-row style="padding-top:10px;font-size:10px" >
            <el-col :span="4" style="text-align:center">
              <el-row>63</el-row>
              <el-row>积分</el-row>
            </el-col>
            <el-col :span="5" style="text-align:center">
              <el-row>{{statisticsData.fans}}</el-row>
              <el-row>粉丝</el-row>
            </el-col>
            <el-col :span="5" style="text-align:center">
              <el-row>{{statisticsData.countLikes}}</el-row>
              <el-row>获赞</el-row>
            </el-col>
            <el-col :span="5" style="text-align:center">
              <el-row>{{statisticsData.countFollows}}</el-row>
              <el-row>评论</el-row>
            </el-col>
            <el-col :span="5" style="text-align:center">
              <el-row>{{statisticsData.countCollections}}</el-row>
              <el-row>收藏</el-row>
            </el-col>
          </el-row>
          <el-row style="padding-top:30px;font-size:10px">
            <el-col :span="12" style="text-align:center">
              <el-button type="success" size="mini" style="width:120px;" plain round :disabled="myself" >私聊</el-button>
            </el-col>
            <el-col :span="12" style="text-align:center">
              <el-button v-if="!statisticsData.followed" type="danger" size="mini" style="width:120px;" @click="follow(statisticsData.userID)" plain round :disabled="myself">关注</el-button>
              <el-button v-else type="danger" size="mini" style="width:120px;" @click="follow(statisticsData.userID)" :disabled="myself" round>已关注</el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="hover" style="margin-top:5px" :body-style="{ padding: '0px' }">
          <el-input placeholder="搜博主文章" v-model="article" size="small">
          <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-card>
        <el-card shadow="hover" style="margin-top:5px;font-size:10px;padding-bottom:10px" :body-style="{ padding: '0px' }" >
          <el-row style="padding:5px 0px 0px 10px;">热门文章<i class="iconfont iconPCbofangye_remen" style="font-size:20px;color:#FF0000"></i></el-row>
          <hr style="border: 1px solid #F5F5F5" />
          <el-row v-if="hotRessData.length != 0">
            <el-row v-for="(item, index) in hotRessData" :key="index">
              <el-row style="padding:5px 0px 0px 10px;">
                <el-link  type="info" style="font-size:10px;color:#000" @click="moreDetail(item)">
                {{item.titile}}
                </el-link>
                <i class="iconfont iconliulan" style="font-size:10px;color:#BEBEBE">{{item.readingQuantity}}</i>
              </el-row>
            </el-row>
          </el-row>
          <el-row v-else style="text-align:center;color:#BEBEBE">暂无热门文章</el-row>
        </el-card>
        <el-card shadow="hover" style="margin-top:5px;font-size:10px;padding-bottom:10px" :body-style="{ padding: '0px' }" >
          <el-row style="padding:5px 0px 0px 10px;">最新文章<i class="iconfont iconzuixin" style="font-size:20px;color:#FF0000"></i></el-row>
          <hr style="border: 1px solid #F5F5F5" />
          <el-row v-if="newRessData.length != 0">
            <el-row v-for="(item, index) in newRessData" :key="index">
              <el-row style="text-align:left;padding:0px 10px 0px 10px;">
                <i class="iconfont iconshijian" style="font-size:10px;color:#BEBEBE">{{item.lastModifyDate}}</i>
              </el-row>
              <el-row style="padding:0px 0px 5px 10px;">
                <el-link  type="info" style="font-size:10px;color:#000" @click="moreDetail(item)">
                {{item.titile}}
                </el-link>
              </el-row>
            </el-row>
          </el-row>
          <el-row v-else style="text-align:center;color:#BEBEBE">暂无最新文章</el-row>
          <hr style="border: 1px solid #F5F5F5" />
          <el-row v-if="annualRessData.length != 0">
            <el-row  style="padding:0px 0px 0px 10px;" class="annual-box">
              <el-card class="annual"
                      :body-style="{ padding: '10px', margin: '0px', border: '0px' }"
                      v-for="(item, index) in annualRessData"
                      :key="index"
                      shadow="never">
                <el-link type="info" style="font-size:10px;color:#000" :underline="false">
                  {{item.annual}}&nbsp;&nbsp;{{item.totalRess}}篇
                </el-link>
              </el-card>
            </el-row>
          </el-row>
          <el-row v-else style="text-align:center;color:#BEBEBE">暂无年度汇总</el-row>
        </el-card>
      </div>
      <div class="detail_content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="'博客('+ RessData.length + ')'" name="first">
            <el-row>
              <el-col :span="8">
                <el-checkbox v-model="isOriginal">只看原创</el-checkbox>
              </el-col>
              <el-col :span="8" style="text-align:center;">
                {{specialColName}}
              </el-col>
              <el-col :span="8" style="text-align:right;font-size:15px">
                排序：
                <el-radio-group v-model="radio" size="mini" @change="changrOrderBy()">
                  <el-radio-button label="发布时间"></el-radio-button>
                  <el-radio-button label="访问量"></el-radio-button>
                </el-radio-group>
              </el-col>
            </el-row>
            <el-row v-for="(res, index) in currentPageData" :key="index">
              <hr style="border: 1px solid #EEE9E9" />
              <el-row>
                <el-row>
                  <el-col :span="18">
                    <el-row>
                      <el-link  type="info" style="color:#000" @click="moreDetail(res)" :underline="false">
                      {{res.titile}}
                      </el-link>
                    </el-row>
                    <el-row style="font-size:1px;color:#8B8989;min-height:50px">
                      <el-link  type="info" style="font-size:1px;color:#8B8989" @click="moreDetail(res)" :underline="false">
                        {{res.description}}
                      </el-link>
                    </el-row>
                    <el-row style="font-size:2px;">
                      <el-col :span="5"><i class="iconfont iconshijian" style="color:#8B8989"></i>&nbsp;{{res.createDate}}</el-col>
                      <el-col :span="2" style="margin-top:2px"><i class="iconfont iconliulan1" style="font-size:15px;color:#8B8989"></i>&nbsp;{{res.readingQuantity}}</el-col>
                      <el-col v-if="res.totalComments" :span="6" style="margin-top:2px"><i class="iconfont iconpinglun" style="font-size:1px;color:#8B8989"></i>&nbsp;{{res.totalComments ? res.totalComments : 0}}</el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="6" style="text-align:right">
                    <img v-if="res.photo.substring(res.photo.lastIndexOf('.')) === '.jpg'" :src="'/api/res/' + res.photo" style="width:180px;height:90px;border-radius:2px"/>
                    <img v-else src="../../assets/img/back_img1.jpg" style="width:180px;height:90px"/>
                  </el-col>
                </el-row>
              </el-row>
            </el-row>
            <el-row style="text-align:center;margin-bottom:10px">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="RessData.length"
                @current-change="handleCurrentChange"
                :current-page="currentPage">
              </el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="'收藏('+ CollectRessData.length + ')'" name="second">
            <el-row v-for="(res, index) in currentPageData2" :key="index">
              <hr style="border: 1px solid #EEE9E9" />
              <el-row>
                <el-row>
                  <el-col :span="18">
                    <el-row>
                      <el-tag size="small">{{res.userName}}</el-tag>
                      <el-link  type="info" style="color:#000" @click="moreDetail(res)" :underline="false">
                        {{res.titile}}
                      </el-link>
                    </el-row>
                    <el-row style="font-size:1px;color:#8B8989;min-height:50px">
                      <el-link  type="info" style="font-size:1px;color:#8B8989" @click="moreDetail(res)" :underline="false">
                        {{res.description}}
                      </el-link>
                    </el-row>
                    <el-row style="font-size:2px;">
                      <el-col :span="5"><i class="iconfont iconshijian" style="color:#8B8989"></i>&nbsp;{{res.createDate}}</el-col>
                      <el-col :span="2" style="margin-top:2px"><i class="iconfont iconliulan1" style="font-size:15px;color:#8B8989"></i>&nbsp;{{res.readingQuantity}}</el-col>
                      <el-col v-if="res.totalComments" :span="6" style="margin-top:2px"><i class="iconfont iconpinglun" style="font-size:1px;color:#8B8989"></i>&nbsp;{{res.totalComments ? res.totalComments : 0}}</el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="6" style="text-align:right">
                    <img v-if="res.photo.substring(res.photo.lastIndexOf('.')) === '.jpg'" :src="'/api/res/' + res.photo" style="width:180px;height:90px;border-radius:2px"/>
                    <img v-else src="../../assets/img/back_img1.jpg" style="width:180px;height:90px"/>
                  </el-col>
                </el-row>
              </el-row>
            </el-row>
            <el-row style="text-align:center;margin-bottom:10px">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="CollectRessData.length"
                @current-change="handleCurrentChange2"
                :current-page="currentPage2">
              </el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="'关注'" name="third">
            <el-tabs type="border-card">
              <el-tab-pane :label="'TA关注的人(' + folllowData.length + ')'">
                <el-row v-for="(res, index) in folllowData" :key="index" >
                  <el-row>
                    <el-col :span="2" style="margin-top:4px">
                      <el-link  type="info" style="color:#000" @click="toPersonal(res.userID)" :underline="false">
                        <img v-if="res !== undefined  && res.photo !== undefined"
                            :src="'/api/res/pkms_avatar/' + res.photo"
                            :alt="res.username" :title="res.username"
                            style="width:45px;height:45px;border-radius:50%">
                        <img v-else src="../../assets/img/logo1.jpg" style="width:45px;height:45px">
                      </el-link>
                    </el-col>
                    <el-col :span="14" style="margin-top:5px">
                      <el-row>
                        <el-link  type="info" style="color:#000" @click="toPersonal(res.userID)" :underline="false">
                          {{res.username}}
                        </el-link>
                      </el-row>
                      <el-row style="font-size:5px;padding-top:5px;color:#8B8989">育龄{{new Date().getFullYear() - res.registerDate.substring(0, 4)}}年</el-row>
                    </el-col>
                    <el-col :span="8" style="text-align:right">
                      <el-button v-if="!res.followed" type="danger" size="mini" style="width:100px;margin-top:10px" @click="res.followed = !res.followed" :disabled="res.userID === sysUserID ? true : false" plain round>关注</el-button>
                      <el-button v-else type="danger" size="mini" style="width:100px;margin-top:10px" @click="res.followed = !res.followed" round>已关注</el-button>
                    </el-col>
                  </el-row>
                  <hr style="border: 1px solid #F5F5F5" />
                </el-row>
              </el-tab-pane>
              <el-tab-pane :label="'TA的粉丝(' + fansData.length + ')'">
                <el-row v-for="(res, index) in fansData" :key="index" >
                  <el-row>
                    <el-col :span="2" style="margin-top:4px">
                      <el-link  type="info" style="color:#000" @click="toPersonal(res.userID)" :underline="false">
                        <img v-if="res !== undefined  && res.photo !== undefined"
                            :src="'/api/res/pkms_avatar/' + res.photo"
                            :alt="res.username" :title="res.username"
                            style="width:45px;height:45px;border-radius:50%">
                        <img v-else src="../../assets/img/logo1.jpg" style="width:45px;height:45px">
                      </el-link>
                    </el-col>
                    <el-col :span="14" style="margin-top:5px">
                      <el-row>
                        <el-link  type="info" style="color:#000" @click="toPersonal(res.userID)" :underline="false">
                          {{res.username}}
                        </el-link>
                      </el-row>
                      <el-row style="font-size:5px;padding-top:5px;color:#8B8989">育龄{{new Date().getFullYear() - res.registerDate.substring(0, 4)}}年</el-row>
                    </el-col>
                    <el-col :span="8" style="text-align:right">
                      <el-button v-if="!res.followed" type="danger" size="mini" style="width:100px;margin-top:10px" @click="res.followed = !res.followed" :disabled="res.userID === sysUserID ? true : false" plain round>关注</el-button>
                      <el-button v-else type="danger" size="mini" style="width:100px;margin-top:10px" @click="res.followed = !res.followed" round>已关注</el-button>
                    </el-col>
                  </el-row>
                  <hr style="border: 1px solid #F5F5F5" />
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="detail_right">
        <el-card shadow="hover" style="font-size:13px;padding:0px 0px 10px 0px" :body-style="{ padding: '0px' }">
          <el-row style="padding:0px 0px 0px 0px;">
            <i class="iconfont iconrecommend" style="color:#FF7F00;font-size:30px"></i>
            <b>可能感兴趣的博主</b>
          </el-row>
          <el-row v-if="recommendUsersData.length > 0">
            <el-row v-for="(item, index) in recommendUsersData"
                    :key="index" style="padding:5px 0px 0px 20px;">
              <hr style="border: 1px solid #F5F5F5" />
                <el-row>
                    <el-col :span="4" style="margin-top:4px">
                      <el-link  type="info" style="color:#000" @click="toPersonal(item.userID)" :underline="false">
                        <img v-if="item !== undefined  && item.photo !== undefined"
                            :src="'/api/res/pkms_avatar/' + item.photo"
                            :alt="item.username" :title="item.username"
                            style="width:45px;height:45px;border-radius:50%">
                        <img v-else src="../../assets/img/logo1.jpg" style="width:45px;height:45px">
                      </el-link>
                    </el-col>
                    <el-col :span="10" style="margin-top:5px">
                      <el-row>
                        <el-link  type="info" style="color:#000" @click="toPersonal(item.userID)" :underline="false">
                          {{item.username}}
                        </el-link>
                      </el-row>
                      <el-row style="font-size:5px;padding-top:5px;color:#8B8989">育龄{{new Date().getFullYear() - item.registerDate.substring(0, 4)}}年</el-row>
                    </el-col>
                    <el-col :span="8" style="text-align:right">
                      <el-button v-if="!item.followed" type="danger" size="mini" style="width:80px;margin-top:10px" @click="item.followed = !item.followed"  :disabled="item.userID === sysUserID ? true : false" plain round>关注</el-button>
                      <el-button v-else type="danger" size="mini" style="width:80px;margin-top:10px" @click="item.followed = !item.followed" round>已关注</el-button>
                    </el-col>
                </el-row>
            </el-row>
          </el-row>
          <el-row v-else style="text-align:center;color:#BEBEBE;">
            <hr style="border: 1px solid #F5F5F5;" />
            暂无博主推荐
          </el-row>
        </el-card>
        <el-card shadow="hover" style="margin-top:5px;font-size:13px;padding:5px 0px 10px 5px" :body-style="{ padding: '0px' }" >
          <el-row style="padding:5px 0px 0px 10px;">
            <el-link :underline="false" @click="specialCol('', '')">
              <i class="iconfont iconfenlei-remen" style="color:#FF4029"></i>
              <b>分类专栏</b>
            </el-link>
          </el-row>
          <el-row v-if="specialColData.length > 0">
            <el-row v-for="(item, index) in specialColData"
                    :key="index">
              <hr style="border: 1px solid #F5F5F5" />
              <el-row style="padding:5px 0px 0px 10px;">
                <el-col :span="20">
                  <el-link type="info" style="font-size:10px;color:#000" :underline="true" @click="specialCol(item.categoryID, item.specialCol)">
                    【{{item.specialCol}}】
                  </el-link>
                  </el-col>
                <el-col :span="4" style="color:#8B8989">{{item.totalRess}}篇</el-col>
              </el-row>
            </el-row>
          </el-row>
          <el-row v-else style="text-align:center;color:#BEBEBE">
            <hr style="border: 1px solid #F5F5F5" />
            博主暂无分类专栏
          </el-row>
        </el-card>
      </div>
  </div>
</template>

<script>
export default {
  name: 'personal',
  data () {
    return {
      sysUserID: JSON.parse(window.sessionStorage.getItem('user')).userID,
      fansData: [],
      folllowData: [],
      specialColName: '全部',
      currentPage: 1,
      currentPageData: [],
      currentPage2: 1,
      currentPageData2: [],
      CollectRessData: [],
      hotRessData: [],
      myself: true,
      RessData: [],
      newRessData: [],
      annualRessData: [],
      recommendUsersData: [],
      specialColData: [],
      statisticsData: [],
      article: '',
      activeName: 'first',
      isOriginal: false,
      radio: '发布时间',
      uid: 0,
      orderby: 2
    }
  },
  async mounted () {
    // console.log('传过来的博主ID------>', this.$route.query.uid)
    this.uid = this.$route.query.uid
    this.toPersonal(this.$route.query.uid)
    if (this.$route.query.cid) {
      this.specialCol(this.$route.query.cid, this.$route.query.cname)
    }
  },
  computed: {
    reuid () {
      return this.$store.uid
    }
  },
  watch: {
    reuid: function () {
      console.log(99999999)
    }
  },
  methods: {
    changrOrderBy () {
      if (this.radio === '访问量') {
        this.orderby = 1
      } else if (this.radio === '发布时间') {
        this.orderby = 2
      }
      this.$axios.get('/api/resources/?categoryID=&userID=' + this.uid + '&orderby=' + this.orderby).then(resp => {
        if (resp) {
          this.RessData = resp
          this.currentPageData = []
          let start = (this.currentPage - 1) * 10
          let end = start + 10
          for (var i = start; i < end; i++) {
            if (this.RessData[i] !== undefined) {
              this.currentPageData.push(this.RessData[i])
            }
          }
        }
      })
      console.log('当前排序方式', this.radio, this.orderby)
    },
    toPersonal (uid) {
      this.$store.uid = uid
      this.uid = uid
      this.init(uid)
      console.log(33333, this.$store.uid)
    },
    moreDetail (res) {
      console.log(8888, res)
      this.$router.push({path: '/UserHome', query: res})
    },
    specialCol (cid, cname) {
      if (cname) {
        this.specialColName = cname
      } else {
        this.specialColName = '全部'
      }
      this.$axios.get('/api/resources/?categoryID=' + cid + '&userID=' + this.uid).then(resp => {
        if (resp) {
          this.RessData = resp
          this.currentPageData = []
          let start = (this.currentPage - 1) * 10
          let end = start + 10
          for (var i = start; i < end; i++) {
            if (this.RessData[i] !== undefined) {
              this.currentPageData.push(this.RessData[i])
            }
          }
        }
      })
      this.activeName = 'first'
    },
    handleCurrentChange (val) {
      document.documentElement.scrollTop = document.body.scrollTop = 0
      this.currentPage = val
      this.currentPageData = []
      let start = (this.currentPage - 1) * 10
      let end = start + 10
      for (var i = start; i < end; i++) {
        if (this.RessData[i] !== undefined) {
          this.currentPageData.push(this.RessData[i])
        }
      }
    },
    handleCurrentChange2 (val) {
      document.documentElement.scrollTop = document.body.scrollTop = 0
      this.currentPage2 = val
      this.currentPageData2 = []
      let start = (this.currentPage2 - 1) * 10
      let end = start + 10
      for (var i = start; i < end; i++) {
        if (this.CollectRessData[i] !== undefined) {
          this.currentPageData2.push(this.CollectRessData[i])
        }
      }
    },
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    follow (followeeID) {
      this.statisticsData.followed = !this.statisticsData.followed
      if (this.statisticsData.followed) {
        this.statisticsData.fans = this.statisticsData.fans + 1
      } else {
        this.statisticsData.fans = this.statisticsData.fans - 1
      }
      this.$axios.get('/api/system/user/follow?followeeID=' + followeeID).then(resp => {
        if (resp) {
        }
      })
    },
    init (uid) {
      this.activeName = 'first'
      this.$axios.get('/api/system/user/statistics?userID=' + uid).then(resp => {
        if (resp) {
          this.statisticsData = resp
          // console.log('博主数据统计---->', resp)
          if (resp.userID === JSON.parse(window.sessionStorage.getItem('user')).userID) {
            this.myself = true
          } else {
            this.myself = false
          }
        }
      })
      // 热门文章
      this.$axios.get('/api/resources/hot?userID=' + uid).then(resp => {
        if (resp) {
          this.hotRessData = resp
        }
      })
      // 最新文章
      this.$axios.get('/api/resources/new?userID=' + uid).then(resp => {
        if (resp) {
          this.newRessData = resp
        }
      })
      // 年度汇总
      this.$axios.get('/api/resources/annualArticle?userID=' + uid).then(resp => {
        if (resp) {
          this.annualRessData = resp
        }
      })
      // 分类专栏
      this.$axios.get('/api/resources/specialCol?userID=' + uid).then(resp => {
        if (resp) {
          this.specialColData = resp
          // console.log(resp)
        }
      })
      this.$axios.get('/api/resources/?categoryID=&userID=' + uid + '&orderby=' + this.orderby).then(resp => {
        if (resp) {
          this.RessData = resp
          this.currentPageData = []
          let start = (this.currentPage - 1) * 10
          let end = start + 10
          for (var i = start; i < end; i++) {
            if (this.RessData[i] !== undefined) {
              this.currentPageData.push(this.RessData[i])
            }
          }
        }
      })
      // 博主的收藏
      this.$axios.get('/api/resources/getCollectionsByuserID/?userID=' + uid + '&orderby=2').then(resp => {
        if (resp) {
          this.CollectRessData = resp
          this.currentPageData2 = []
          let start = (this.currentPage2 - 1) * 10
          let end = start + 10
          for (var i = start; i < end; i++) {
            if (this.CollectRessData[i] !== undefined) {
              this.currentPageData2.push(this.CollectRessData[i])
            }
          }
        }
      })
      // 博主的关注
      this.$axios.get('/api/system/user/getfollowee/?userID=' + uid).then(resp => {
        if (resp) {
          if (resp) {
            this.folllowData = resp
            // console.log('关注的人人', resp)
            // this.currentPageData3 = []
            // let start = (this.currentPage3 - 1) * 10
            // let end = start + 10
            // for (var i = start; i < end; i++) {
            //   if (this.folllowData[i] !== undefined) {
            //     this.currentPageData3.push(this.folllowData[i])
            //   }
            // }
          }
        }
      })
      // 博主的粉丝
      this.$axios.get('/api/system/user/getfans/?userID=' + uid).then(resp => {
        if (resp) {
          if (resp) {
            this.fansData = resp
            // console.log('粉丝ssssss', resp)
          }
        }
      })
      // 感兴趣的人
      this.$axios.get('/api/system/user/recommendUsers/?userID=' + uid).then(resp => {
        if (resp) {
          if (resp) {
            this.recommendUsersData = resp
            console.log('感兴趣的人', resp)
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
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
.detail_left{
    width: 20%;
    position: relative;
    background-color: rgba(30, 255, 0, 0);
    left: -1%;
    margin-top: 10px;
  }
  .detail_content {
    margin-top: 10px;
    width: 50%;
    position: relative;
    left: 0%;
    // background-color: #00ff2a;
    // opacity: 0.5;
    background-color: rgba(0, 217, 255, 0);
  }
  .detail_right{
    width: 24%;
    position: relative;
    background-color: rgba(0, 217, 255, 0);
    left: 1%;
    margin-top: 10px;
  }
  .annual-box{
    display: flex;
    margin: 10px 10px 0px 10px;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .annual{
    width:133px;
    background-color: rgba(165, 42, 42, 0);
    border: 0px;
  }
</style>
