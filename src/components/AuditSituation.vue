<template>
    <div>
      <template>
       <div style="width: 60%" >
         <el-row>
              <el-col :span="5">
                <div class="block">
                  <el-timeline>
                    <el-timeline-item
                      v-for="(activity, index) in activities"
                      :key="index"
                      :icon="activity.icon"
                      :type="activity.type"
                      :color="activity.color"
                      :size="activity.size"
                      :timestamp="activity.timestamp">
                      <span :style="'color:'+ activity.color">{{activity.content}}</span>
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </el-col>
              <el-col :span="19">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <i v-if="audited === -1" class="iconfont iconshanchuhang" :style="'color:' + activities[1].color"></i>
                    <i v-if="audited === 0" class="iconfont iconweishenhe" :style="'color:' + activities[1].color"></i>
                    <i v-if="audited === 1" class="iconfont iconyishenhe" :style="'color:#67C23A'"></i>
                    <span :style="'color:' + activities[1].color">{{situation}}</span>
                  </div>
                  <div style="color:#909399">
                    <span>审核环节：</span><span>管理员审核</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>审核人：</span><span>{{auditor}}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>审核时间：</span><span>{{auditTime}}</span>
                  </div>
                  <div style="color:#909399;margin-top:10px">
                    <span>审核意见：</span>
                    <span>{{auditOpinion}}</span>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span style="color:#F56C6C">说明：上述流程中蓝色表示已审核，黄色表示待审核，红色表示审核不通过或退回</span>
              </el-col>
            </el-row>
        </div>
      </template>
    </div>
</template>

<script>
export default {
  name: 'AuditSituation',
  props: ['createDate', 'auditor', 'auditTime', 'auditOpinion', 'audited'],
  data () {
    return {
      situation: '',
      activities: [{
        content: '创建成功',
        timestamp: '',
        color: '#409EFF'
      }, {
        content: '管理员审核',
        timestamp: '',
        color: ''
      }, {
        content: '成功发布',
        timestamp: '',
        color: ''
      }]
    }
  },
  mounted () {
    this.activities[0].timestamp = this.createDate
    if (this.audited === -1) {
      this.situation = '不通过'
      this.activities[1].timestamp = this.auditTime
      this.activities[1].color = '#F56C6C'
      this.activities[2].timestamp = ''
      this.activities[2].color = '#909399'
    } else if (this.audited === 0) {
      this.situation = '待审核'
      this.activities[1].timestamp = ''
      this.activities[1].color = '#E6A23C'
      this.activities[2].timestamp = ''
      this.activities[2].color = '#909399'
    } else if (this.audited === 1) {
      this.situation = '已通过'
      this.activities[1].timestamp = this.auditTime
      this.activities[1].color = '#409EFF'
      this.activities[2].timestamp = this.auditTime
      this.activities[2].color = '#409EFF'
    }
  },
  created () {
    this.activities[0].timestamp = this.createDate
    if (this.audited === -1) {
      this.situation = '不通过'
      this.activities[1].timestamp = this.auditTime
      this.activities[1].color = '#F56C6C'
      this.activities[2].timestamp = ''
      this.activities[2].color = '#909399'
    } else if (this.audited === 0) {
      this.situation = '待审核'
      this.activities[1].timestamp = ''
      this.activities[1].color = '#E6A23C'
      this.activities[2].timestamp = ''
      this.activities[2].color = '#909399'
    } else if (this.audited === 1) {
      this.situation = '已通过'
      this.activities[1].timestamp = this.auditTime
      this.activities[1].color = '#409EFF'
      this.activities[2].timestamp = this.auditTime
      this.activities[2].color = '#409EFF'
    }
  }
}
</script>

<style scoped >

</style>
