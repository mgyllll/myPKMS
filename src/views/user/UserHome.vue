<template>
  <div style="background-color:#F5F5F5;" class="home">
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
    <el-dialog
      :title="content.title"
      :visible.sync="centerDialogVisible"
      width="70%"
      center>
      <span style="text-align:center">
        <PreviewVideo v-if="type === 'mp4'" :Preview="content"></PreviewVideo>
        <PreviewAudio v-else-if="type === 'mp3'" :Preview="content"></PreviewAudio>
        <PreviewPDF v-else-if="type === 'pdf'" :Preview="content"></PreviewPDF>
        <PreviewImage v-else-if="type === 'jpg' || type === 'png'" :Preview="content"></PreviewImage>
        <span v-else style="color:#BEBEBE">非常抱歉！暂不支持该文件类型的预览，请下载后用相关应用打开！</span>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="centerDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <div style="display:flex;justify-content:center;margin-top:10px">
      <el-input style="width:500px;margin-right:10px"
                prefix-icon="el-icon-search"
                placeholder="请输入关键词进行搜索..."
                @keyup.enter.native="enter"
                v-model="keyword"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    </div>
    <div class="sort" v-show="!isDetailShow" style="width:100px">
        <el-select size="mini" v-model="sort" placeholder="排序方式" style="width:100px" @change="changeSort">
          <el-option
            style="font-size:1px"
            size="mini"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
    </div>
    <div class="resource-container" v-show="!isDetailShow">
      <el-card class="resource-card" v-for="(resource, index) in currentPageData" :key="index" shadow="hover" :body-style="{ padding: '0px 10px 0px 10px' }">
        <div slot="header">
        <div class="avatar-img" style="float: left;">
          <img v-if="resource.avatar !== ''"
          :src="'/api/res/pkms_avatar/' + resource.avatar" :title="resource.title" class="userface-img">
          <img v-else src="../../assets/img/logo1.jpg" :title="resource.title" class="userface-img">
        </div>
          <div class="username" >
            <el-link @click="toPersonal(resource.userID)" style="color:#000" :underline="false">
              {{resource.userName}}
            </el-link>
            <i v-if="resource.gender === '男'" class="iconfont iconnv" style="color:#02e0ff"></i>
            <i v-else class="iconfont iconnv" style="color:#fd01b3"></i>
        </div>
        <div class="createTime">
          {{resource.createDate}} · 发布了文章
        </div>
        </div>
        <div  class="clearfix" >
          <img v-if="resource.photo.substring(resource.photo.lastIndexOf('.')) === '.jpg'"
          :src="'/api/res/' + resource.photo" :alt="'陈惠琳'" :title="resource.title" style="width:420px;height:240px">
          <img v-else src="../../assets/img/back_img1.png" :alt="'陈惠琳'" :title="resource.title" style="width:420px;height:240px">
          <div class="title">
            <span style="color:#000">{{resource.titile}}</span>
          </div>
        </div>
        <div style="height:0px;padding:0px;margin:0px">
          <div class="scan">
            <el-button style="float: left; padding: 3px 0px; color:#a5a5a5" type="text">
              <i class="iconfont iconyulan" style="font-size:15 px">&nbsp;{{resource.readingQuantity}}</i>
            </el-button>
            <el-button style="float: left; padding: 3px 0; color:#a5a5a5;margin-left:15px" type="text"  >
              <i class="iconfont icondianzan" style="font-size:15 px">&nbsp;{{resource.countLikes}}</i>
            </el-button>
            <el-button style="float: right; padding: 3px 0; color:#a5a5a5;margin-left:15px" type="text" @click="moreDetail(resource)" >
              <i class="iconfont iconmore" style="font-size:15 px"></i>
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div class="block" style="margin-left:450px" v-show="!isDetailShow">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[6, 15, 30, 60]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <div v-show="isDetailShow"
          class="detail"
          >
      <div class="detail_left">
        <el-card shadow="hover">
          <el-row>
            <el-col :span="5">
              <el-link @click="toPersonal(resDetailData.userID)" style="color:#000" :underline="false">
                <img v-if="resDetailData !== undefined  && resDetailData.avatar !== undefined"
                      :src="'/api/res/pkms_avatar/' + resDetailData.avatar"
                      :alt="resDetailData.userName" :title="resDetailData.userName"
                      style="width:45px;height:45px;border-radius:50%">
                <img v-else src="../../assets/img/logo1.jpg"
                      :alt="resDetailData.userName" :title="resDetailData.userName"
                      style="width:45px;height:45px">
              </el-link>
            </el-col>
            <el-col :span="19" style="font-size:10px">
              <el-row style="padding-top:5px">
                <el-link @click="toPersonal(resDetailData.userID)" style="color:#000" :underline="false">
                  {{resDetailData.userName}}
                </el-link>
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
              <el-row>{{statisticsData.countComments}}</el-row>
              <el-row>评论</el-row>
            </el-col>
            <el-col :span="5" style="text-align:center">
              <el-row>{{statisticsData.countCollections}}</el-row>
              <el-row>收藏</el-row>
            </el-col>
          </el-row>
          <el-row style="padding-top:30px;font-size:10px">
            <el-col :span="12" style="text-align:center">
              <el-button type="success" size="mini" style="width:120px;" plain round :disabled="myself" @click="toChat(statisticsData)" >私聊</el-button>
            </el-col>
            <el-col :span="12" style="text-align:center">
              <el-button v-if="followStatus == false" type="danger" size="mini" style="width:120px;" @click="follow(statisticsData.userID)" plain round :disabled="myself">关注</el-button>
              <el-button v-else type="danger" size="mini" style="width:120px;" @click="follow(statisticsData.userID)" round>已关注</el-button>
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
        <el-row style="margin:10px 0px 0px 40px;">
          <el-col :span="24" >
            <el-button type="text" @click="callBack">
              <i class="iconfont iconreturn" style="font-size:30px;color:#DCDCDC"></i>
            </el-button>
          </el-col>
        </el-row>
        <el-row style="margin:0px 0px 0px 40px;font-size:25px">
          <el-col :span="24" >{{resDetailData.titile}}</el-col>
        </el-row>
        <el-row style="margin:10px 0px 0px 40px;font-size:13px">
          <el-col :span="2">
            <el-link @click="toPersonal(resDetailData.userID)" style="color:#000" :underline="false">
              <img v-if="resDetailData !== undefined  && resDetailData.avatar !== undefined"
                :src="'/api/res/pkms_avatar/' + resDetailData.avatar" :alt="resDetailData.userName" :title="resDetailData.userName" class="userface-img">
              <img v-else src="../../assets/img/logo1.jpg" :alt="resDetailData.userName" :title="resDetailData.userName" class="userface-img">
            </el-link>
          </el-col>
          <el-col :span="22" style="color:#BEBEBE">
            <el-row>
              <el-col :span="2" style="margin-top:2px;color:#000">
                <el-link @click="toPersonal(resDetailData.userID)" style="color:#000" :underline="false">
                &nbsp;&nbsp;{{resDetailData.userName}}
                </el-link>
              </el-col>
              <el-col :span="22" style="margin-top:2px;" >
                {{resDetailData.createDate}}
              </el-col>
            </el-row>
            <el-row style="margin-top:5px;">
              <el-col :span="10" style="padding-left:7px">
                分类专栏：<el-tag type="success" size="mini">【{{resDetailData.specialCol}}】</el-tag>
              </el-col>
              <el-col :span="10">
                文章标签：
                <el-tag size="mini" v-for="val in resDetailData.label" :key="val">{{val}}</el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row style="margin:10px 40px 0px 40px">
          <el-col :span="24" class="zhaiyao">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {{resDetailData.description}}
          </el-col>
        </el-row>
        <el-row style="text-align:center;margin-top:10px">
          <el-col :span="24">
            <img v-if="resDetailData !== undefined  && resDetailData.photo !== undefined"
            :src="'/api/res/' + resDetailData.photo"  style="width:531px;height:315px">
            <img v-else src="../../assets/img/back_img1.png"  style="width:420px;height:240px">
          </el-col>
        </el-row>
        <!-- <el-row v-if="resDetailData.richText" style="margin:10px 40px 0px 40px">
          <el-col class="markdown-body" v-html="resDetailData.richText">
          </el-col>
        </el-row> -->
        <el-row v-if="resDetailData.richText" style="margin:10px 40px 0px 40px">
          <mavon-editor
              class="rich"
              :value="richContent"
              :subfield="false"
              :defaultOpen="'preview'"
              :toolbarsFlag="false"
              :editable="false"
              :scrollStyle="false"
              :ishljs="true"
              :boxShadow="false"
              previewBackground="#fff"
              :imageClick="previewImg"
              style="border:0px;"
            />
          <!-- <mavon-editor :toolbarsFlag='false' :ishljs="true" v-model="richContent"></mavon-editor> -->
        </el-row>
        <el-row class="file-container">
          <el-card class="file-card" shadow="hover" :body-style="{ padding: '10px 5px 0px 20px' }" v-for="(file, index) in fileDetailData" :key="index">
            <el-row>
              <el-col :span="24">
                {{file.fileName + '.' + file.types[0].suffix}}
              </el-col>
            </el-row>
            <el-row style="margin-top:20px">
              <el-col :span="2">
                <img :src="require('../../assets/img/' + file.types[0].suffix + '.png')" style="width:100%" />
              </el-col>
              <el-col :span="16" style="margin-top:12px">
                {{file.types[0].suffix}}
              </el-col>
              <el-col :span="2" style="text-align:right;margin-top:12px">
                <el-button type="text" @click="previewFile(file)">
                  <i class="iconfont iconyulan" style="color:#8a8a8a"></i>
                </el-button>
              </el-col>
              <el-col :span="2" style="text-align:right;margin-top:22px">
                <a :href="'/api/res' + file.filePath" :download="file.fileName" style="text-decoration:none;">
                  <i class="iconfont iconxiazai" style="color:#8a8a8a;"></i>
                </a>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
        <el-row style="margin:40px 0px 0px 40px;color:#BEBEBE;font-size:15px">
          <el-col :span="24">
            阅读&nbsp;{{readingQuantity}}
          </el-col>
        </el-row>
        <el-row style="margin:5px 0px 0px 40px;color:#1E90FF">
          <el-col :span="3" style="margin-top:5px">
            <i class="iconfont iconfenxiang" style="font-size:15px;">分享</i>
          </el-col>
          <el-col :span="9" style="margin-top:5px">
            <el-button type="text" @click="collectResource(resDetailData)" style="margin:0px;padding:0px">
              <i v-show="collect" class="iconfont iconshoucang1" style="font-size:15px">收藏</i>
              <i v-show="!collect" class="iconfont iconcollection" style="font-size:15px">收藏</i>
            </el-button>
          </el-col>
          <el-col :span="8" style="text-align:right;margin-top:5px;margin-left:10px" >
            <el-button type="text" @click="likeResource(resDetailData)" style="margin:0px;padding:0px">
              <i v-show="likeRes" class="iconfont icondianzan3" style="font-size:15px">赞&nbsp;{{countLikes}}</i>
              <i v-show="!likeRes" class="iconfont icondianzan1" style="font-size:15px">赞&nbsp;{{countLikes}}</i>
            </el-button>
          </el-col>
          <el-col :span="2" style="text-align:right;margin-left:10px;margin-top:5px">
            <el-button type="text" @click="readingRes(resDetailData)" style="margin:0px;padding:0px">
              <i v-show="reading" class="iconfont iconchakan" style="font-size:15px">在看</i>
              <i v-show="!reading" class="iconfont iconbiyan--" style="font-size:15px">在看</i>
            </el-button>
          </el-col>
        </el-row>
        <el-row style="margin:20px 40px 0px 40px;">
          <el-col :span="24" >
            <el-divider content-position="left">
              <span style="font-size:20px;color:#BEBEBE">评论</span>
              <span style="font-size:10px;color:#BEBEBE">·{{commentsData.length}}</span>
            </el-divider>
          </el-col>
        </el-row>
        <el-row style="margin:20px 40px 0px 40px;color:#BEBEBE">
          <el-col :span="21">
              <el-input v-model="input" @keyup.enter.native="commnet(resDetailData)" placeholder="写下你的留言" size="small">
                <el-button slot="append" icon="fa fa-smile-o" style="font-size:25px" size="small"></el-button>
              </el-input>
          </el-col>
          <el-col :span="3" style="text-align:right">
            <el-button type="success" size="small" style="width:80px">评论</el-button>
          </el-col>
        </el-row>
        <el-row v-if="commentsData" style="margin:20px 40px 0px 40px;">
          <el-col :span="24" v-for="(item, index) in commentsData" :key="index">
            <el-row style="margin-bottom:13px">
              <el-col :span="1">
                <img :src="'/api/res/pkms_avatar/' + item.photo"  style="width:35px;height:35px;border-radius:2px">
              </el-col>
              <el-col :span="18" style="font-size:13px;margin-left:15px">
                <el-row style="color:#BEBEBE">{{item.reviewerName}}</el-row>
                <el-row>{{item.commentContent}}</el-row>
              </el-col>
              <el-col :span="4" style="text-align:right">
                <el-button type="text" @click="likeComment(item)">
                  <i v-show="item.liked" class='iconfont icondianzan3' style="font-size:10px" >{{item.countLikes}}</i>
                  <i v-show="!item.liked" class='iconfont icondianzan1' style="font-size:10px" >{{item.countLikes}}</i>
                </el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row style="margin:20px 40px 0px 40px;">
          <el-col :span="24" >
            <el-divider><i class="el-icon-loading"></i></el-divider>
          </el-col>
        </el-row>
      </div>
      <div class="detail_right">
        <el-card shadow="hover" style="font-size:13px;padding:0px 0px 10px 0px" :body-style="{ padding: '0px' }">
          <el-row style="padding:0px 0px 0px 0px;">
            <i class="iconfont iconrecommend" style="color:#FF7F00;font-size:30px"></i>
            <b>相关推荐</b>
          </el-row>
          <el-row v-if="recommendRessData.length > 0">
            <el-row v-for="(item, index) in recommendRessData"
                    :key="index" style="padding:5px 0px 0px 20px;">
              <hr style="border: 1px solid #F5F5F5" />
              <el-row>
                <el-link style="font-size:10px;color:#000"  type="info" @click="moreDetail(item)">
                {{item.titile}}
                </el-link>
              <i class="iconfont iconliulan" style="font-size:10px;color:#BEBEBE">{{item.readingQuantity}}</i>
              </el-row>
              <el-row style="font-size:1px;color:#8B8989">
                {{item.description.length > 25 ? item.description.substring(0, 25) + '...' : item.description}}
              </el-row>
            </el-row>
          </el-row>
          <el-row v-else style="text-align:center;color:#BEBEBE;">
            <hr style="border: 1px solid #F5F5F5;" />
            暂无相关推荐
          </el-row>
        </el-card>
        <el-card shadow="hover" style="margin-top:5px;font-size:13px;padding:5px 0px 10px 5px" :body-style="{ padding: '0px' }" >
          <el-row style="padding:5px 0px 0px 10px;">
            <i class="iconfont iconfenlei-remen" style="color:#FF4029"></i>
            <b>分类专栏</b>
          </el-row>
          <el-row v-if="specialColData.length > 0">
            <el-row v-for="(item, index) in specialColData"
                    :key="index">
              <hr style="border: 1px solid #F5F5F5" />
              <el-row style="padding:5px 0px 0px 10px;">
                <el-col :span="20">
                  <el-link type="info" style="font-size:10px;color:#000" @click="specialCol(statisticsData.userID, item.categoryID, item.specialCol)" :underline="true">
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
  </div>
</template>

<script>
import PreviewVideo from '../../components/PreviewVideo'
import PreviewAudio from '../../components/PreviewAudio'
import PreviewPDF from '../../components/PreviewPDF'
import PreviewImage from '../../components/PreviewImage'
import card from '../../components/chat/card.vue'
import list from '../../components/chat/list.vue'
import message from '../../components/chat/message.vue'
import usertext from '../../components/chat/usertext.vue'
import 'github-markdown-css'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'userHome',
  components: {
    PreviewVideo,
    PreviewAudio,
    PreviewPDF,
    PreviewImage,
    card,
    list,
    message,
    usertext
  },
  data () {
    return {
      drawer: false,
      richContent: '',
      orderby: 3,
      myself: true,
      scrollTop: 0,
      btnFlag: false,
      statisticsData: {},
      specialColData: [],
      recommendRessData: [],
      annualRessData: [],
      newRessData: [],
      hotRessData: [],
      article: '',
      readingQuantity: 0,
      countLikes: 0,
      followStatus: false,
      likeRes: false,
      collect: false,
      reading: false,
      commentsData: [],
      input: '',
      type: '',
      content: {
        src: '',
        title: '',
        artist: '未知艺术家',
        lrc: '',
        pic: ''
      },
      centerDialogVisible: false,
      fileDetailData: [],
      resDetailData: [],
      isDetailShow: false,
      currentPageData: [],
      pagesize: 6,
      total: 0,
      currentPage: 1,
      currentPage1: 1,
      currentSize: 6,
      keyword: '',
      resourcesData: [],
      options: [{
        value: 3,
        label: '发布时间'
      }, {
        value: 2,
        label: '阅读量'
      }, {
        value: 1,
        label: '点赞量'
      }],
      sort: '发布时间'
    }
  },
  async mounted () {
    this.initResources()
    console.log('资源iD', this.$route.query)
    if (this.$route.query.resourceID) {
      this.moreDetail(this.$route.query)
    }
  },
  destroyed () {
  },
  methods: {
    toChat (user) {
      this.$store.state.filterKey = user.username
      this.$store.dispatch('initData')
      this.$store.state.filterKey = ''
      this.$store.commit('changeCurrentSession', user)
      this.drawer = true
    },
    specialCol (uid, cid, cname) {
      this.$router.push({path: '/Personal', query: {uid: uid, cid: cid, cname: cname}})
    },
    toPersonal (uid) {
      // console.log('博主：', uid)
      this.$router.push({path: '/Personal', query: {uid: uid}})
    },
    previewImg (val) {
      // console.log(val)
    },
    changeSort (newVal) {
      // console.log(55555555, newVal)
      this.orderby = newVal
      this.initResources()
    },
    follow (followeeID) {
      this.followStatus = !this.followStatus
      if (this.followStatus) {
        this.statisticsData.fans = this.statisticsData.fans + 1
      } else {
        this.statisticsData.fans = this.statisticsData.fans - 1
      }
      this.$axios.get('/api/system/user/follow?followeeID=' + followeeID).then(resp => {
        if (resp) {
        }
      })
    },
    callBack () {
      this.isDetailShow = false
      // console.log(this.currentPage1, this.currentSize)
      this.handleCurrentChange(this.currentPage1)
      this.handleSizeChange(this.currentSize)
    },
    likeResource (item) {
      this.likeRes = !this.likeRes
      if (this.likeRes) {
        this.statisticsData.countLikes = this.statisticsData.countLikes + 1
        this.countLikes = this.countLikes + 1
      } else {
        this.statisticsData.countLikes = this.statisticsData.countLikes - 1
        this.countLikes = this.countLikes - 1
      }
      // console.log(item.resourceID)
      this.$axios.get('/api/resources/like?resourceID=' + item.resourceID).then(resp => {
        this.initResources()
      })
    },
    readingRes (item) {
      this.reading = !this.reading
      this.$axios.get('/api/resources/reading?resourceID=' + item.resourceID).then(resp => {
        this.initResources()
      })
    },
    collectResource (item) {
      this.collect = !this.collect
      if (this.collect) {
        this.statisticsData.countCollections = this.statisticsData.countCollections + 1
      } else {
        this.statisticsData.countCollections = this.statisticsData.countCollections - 1
      }
      this.$axios.get('/api/resources/collect?resourceID=' + item.resourceID).then(resp => {
        this.initResources()
      })
    },
    likeComment (item) {
      this.$axios.get('/api/comments/like?commentID=' + item.commentID).then(resp => {
        this.initComments(item.resourceID)
      })
    },
    commnet (res) {
      if (this.input !== '') {
        let com = {
          commentContent: '',
          resourceID: 0
        }
        com.commentContent = this.input
        this.input = ''
        com.resourceID = res.resourceID
        // console.log('新增评论一条', com)
        this.$axios.put('/api/comments/addComm', com).then(resp => {
          if (resp) {
            // console.log(resp)
            this.initComments(resp.obj.resourceID)
            this.statisticsData.countComments = this.statisticsData.countComments + 1
          }
        })
      } else {
        alert('评论不能为空！')
      }
    },
    previewFile (file) {
      this.type = file.filePath.split('.')[1]
      this.content.src = '/api/res' + file.filePath
      this.content.title = file.fileName
      this.centerDialogVisible = true
    },
    moreDetail (res) {
      this.currentPage1 = this.currentPage
      this.currentSize = this.pagesize
      console.log('传过来的', res.userID)
      console.log('登录的', JSON.parse(window.sessionStorage.getItem('user')).userID + '')
      if (res.userID + '' === JSON.parse(window.sessionStorage.getItem('user')).userID + '') {
        this.myself = true
      } else {
        this.myself = false
      }
      console.log('是自己吗', this.myself)
      this.readingQuantity = res.readingQuantity + 1
      this.$axios.get('/api/resources/read?resourceID=' + res.resourceID).then(resp => {
        this.initResources()
      })
      this.countLikes = res.countLikes
      this.likeRes = res.liked
      this.collect = res.collected
      this.reading = res.reading
      const that = this
      setTimeout(function () {
        // console.log('执行了')
        that.isDetailShow = true
        document.documentElement.scrollTop = document.body.scrollTop = 0
      }, 300)
      this.resDetailData = res
      this.resDetailData.label = res.tag.split(';')
      // console.log(this.resDetailData.label)
      // console.log(res)
      this.$axios.get('/api/files/?resourceId=' + res.resourceID).then(resp => {
        if (resp) {
          this.fileDetailData = resp
          // console.log(resp)
        }
      })
      this.initComments(res.resourceID)
      this.$axios.get('/api/resources/hot?userID=' + res.userID).then(resp => {
        if (resp) {
          this.hotRessData = resp
        }
      })
      this.$axios.get('/api/resources/new?userID=' + res.userID).then(resp => {
        if (resp) {
          this.newRessData = resp
        }
      })
      this.$axios.get('/api/resources/annualArticle?userID=' + res.userID).then(resp => {
        if (resp) {
          this.annualRessData = resp
        }
      })
      this.$axios.get('/api/resources/recommend?resourceID=' + res.resourceID).then(resp => {
        if (resp) {
          this.recommendRessData = resp
        }
      })
      this.$axios.get('/api/resources/specialCol?userID=' + res.userID).then(resp => {
        if (resp) {
          this.specialColData = resp
        }
      })
      this.$axios.get('/api/system/user/statistics?userID=' + res.userID).then(resp => {
        if (resp) {
          this.statisticsData = resp
          // console.log('博主数据统计---->', resp)
          this.followStatus = resp.followed
        }
      })
      if (this.resDetailData.richText) {
        this.richContent = this.resDetailData.richText
        var MardownIt = require('markdown-it')
        var md = new MardownIt()
        var rText = this.resDetailData.richText
        var result = md.render(rText)
        this.resDetailData.richText = result
      }
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.currentPageData = []
      this.pagesize = val
      this.total = this.resourcesData.length
      let start = (this.currentPage - 1) * this.pagesize
      let end = start + this.pagesize
      for (var i = start; i < end; i++) {
        if (this.resourcesData[i] !== undefined) {
          this.currentPageData.push(this.resourcesData[i])
        }
      }
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.currentPageData = []
      this.currentPage = val
      this.total = this.resourcesData.length
      let start = (this.currentPage - 1) * this.pagesize
      let end = start + this.pagesize
      for (var i = start; i < end; i++) {
        if (this.resourcesData[i] !== undefined) {
          this.currentPageData.push(this.resourcesData[i])
        }
      }
    },
    initResources () {
      this.$axios.get('/api/resources/shareRes?keyword=' + this.keyword + '&orderby=' + this.orderby).then(resp => {
        if (resp) {
          this.resourcesData = resp
          this.currentPage = 1
          this.pagesize = 6
          this.currentPageData = []
          this.total = this.resourcesData.length
          let start = (this.currentPage - 1) * this.pagesize
          let end = start + this.pagesize
          for (var i = start; i < end; i++) {
            if (this.resourcesData[i] !== undefined) {
              this.currentPageData.push(this.resourcesData[i])
            }
          }
        }
      })
    },
    search () {
      this.initResources()
    },
    enter () {
      this.isDetailShow = false
      this.initResources()
    },
    initComments (resID) {
      this.$axios.get('/api/comments/?resourceId=' + resID).then(resp => {
        if (resp) {
          // console.log('评论', resp)
          this.commentsData = resp
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
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
.resource-container{
    display: flex;
    margin: 10px 40px 0px 40px;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .resource-card{
    width:440px;
    margin-bottom: 20px;
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
  .clearfix{
    // background-image: url('../../assets/img/back_img1.png');
    background-size: 420px 287px;
    margin-top: 0px;
    margin-bottom: 10px;
  }
  .title{
    position: relative;
    top: 62%;
    left: 0%;
    margin: 0px 5px ;
    color: #000;
  }
  .userface-img{
    width: 45px;
    height: 45px;
    border-radius: 40px;
    margin-left: 0px;
  }
  .avatar-img{
    position: relative;
    top: -22%;
  }
  .username{
    font-family: '微软雅黑';
    font-size: 8px;
    position: relative;
    left: 10px;
  }
  .createTime{
    color: #b6b4b4;
    font-size: 5px;
    position: relative;
    left: 2%;
    font-size: 10px;
    width: 200px;
  }
  .scan{
    position: relative;
    top: 0%;
    left: 0%;
  }
  .sort{
    position: relative;
    left: 90%;
  }
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
  }
  .detail_left{
    width: 20%;
    position: relative;
    background-color: rgba(165, 42, 42, 0);
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
    background-color: #ffffff;
  }
  .detail_right{
    width: 24%;
    position: relative;
    background-color: rgba(45, 224, 255, 0);
    left: 1%;
    margin-top: 10px;
  }
  .file-card {
    margin-top: 10px ;
    width:680px;
    font-size: 15px;
    background-color: #F5F5F5;
  }
  .file-container {
    display: flex;
    margin: 10px 40px 0px 40px;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
