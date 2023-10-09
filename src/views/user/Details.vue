<template>
  <div>
    <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
      <el-tab-pane label="资源详情" name="fix" closable>
        <el-row :gutter="15">
          <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
            <el-col :span="20">
              <el-form-item label="知识标题" prop="title">
                <el-input v-model="formData.title" placeholder="请输入标题知识标题" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="知识类别" prop="category">
                <el-cascader v-model="formData.category" :options="categoryOptions" :props="categoryProps"
                  :style="{width: '100%'}" placeholder="请选择知识类别" filterable clearable></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="内容简介" prop="note">
                <el-input v-model="formData.note" type="textarea" placeholder="请输入内容简介" show-word-limit
                  :autosize="{minRows: 10, maxRows: 10}" :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="知识标签" prop="label">
                <el-select v-model="formData.label" placeholder="请选择知识标签" multiple filterable clearable
                  :style="{width: '100%'}">
                  <el-option v-for="(item, index) in labelOptions" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="知识资源" prop="upload" required>
                <el-upload ref="upload" :file-list="uploadfileList" :action="uploadAction" multiple
                  :before-upload="uploadBeforeUpload">
                  <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
                </el-upload>
                <el-table
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column
                    prop="fileID"
                    label="文件编码"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="fileName"
                    label="文件名称"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    label="文件类型">
                  </el-table-column>
                  <el-table-column
                    prop="uploadDate"
                    label="上传时间">
                  </el-table-column>
                  <el-table-column
                    prop="operate"
                    label="操作">
                  <el-button type="danger" icon="el-icon-delete" size="mini" round>删除</el-button>
                  <el-button type="info" icon="el-icon-share" size="mini" round>预览</el-button>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item size="large">
                <el-button type="warning" icon="el-icon-thumb" @click="saveForm">保存</el-button>
                <el-button icon="el-icon-brush" @click="resetForm">重置</el-button>
                <el-button type="primary" icon="el-icon-position" @click="submitForm">提交</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </el-tab-pane>
      <el-tab-pane
        :key="item.name"
        v-for="(item) in editableTabs"
        :label="item.title"
        :name="item.name"
      >
        {{item.content}}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'userHome',
  components: {},
  props: [],
  data () {
    return {
      tableData1: [{
        fileID: 'A001',
        fileName: '治疗湿疹的处方药',
        type: 'TXT',
        uploadDate: '2017-01-04'
      },
      {
        fileID: 'A002',
        fileName: '宝宝湿疹如何洗澡',
        type: 'MP4',
        uploadDate: '2017-01-11'
      }],
      formData: {
        title: '春季婴儿湿疹症状及治疗方法',
        category: [],
        label: [],
        note: ' 婴儿湿疹最佳治疗方法？婴儿湿疹婴儿时期常见的一种皮肤病，2～3个月的婴儿就可发生湿疹，1岁以后逐渐减轻，到2岁以后大多数可以自愈，但少数可以延伸到幼儿或儿童期。有婴儿湿疹的孩子以后容易发生其他过敏性疾病，如哮喘、过敏性鼻炎、过敏性结膜炎等。年轻的妈妈如何应对婴儿湿疹呢？',
        upload: null
      },
      rules: {
        title: [{
          required: true,
          message: '请输入标题知识标题',
          trigger: 'blur'
        }],
        category: [{
          required: true,
          type: 'array',
          message: '请至少选择一个知识类别',
          trigger: 'change'
        }],
        label: [{
          required: true,
          type: 'array',
          message: '请至少选择一个知识标签',
          trigger: 'change'
        }],
        note: [{
          required: true,
          message: '请输入内容简介',
          trigger: 'blur'
        }]
      },
      uploadAction: 'f:\\',
      uploadfileList: [],
      categoryOptions: [{
        value: 1,
        label: '备孕',
        children: [{
          value: 101,
          label: '备孕疾病',
          children: [{
            value: 10101,
            label: '多囊卵巢'
          }, {
            value: 10102,
            label: '子宫疾病'
          }, {
            value: 10103,
            label: '月经异常'
          }]
        }, {
          value: 102,
          label: '备孕技巧',
          children: [{
            value: 10201,
            label: '测排卵'
          }, {
            value: 10202,
            label: '同房技巧'
          }, {
            value: 10203,
            label: '男性备孕'
          }, {
            value: 10204,
            label: '孕前检查'
          }, {
            value: 10205,
            label: '优生优育'
          }]
        }, {
          value: 103,
          label: '难孕难育',
          children: [{
            value: 10301,
            label: '试管婴儿'
          }, {
            value: 10302,
            label: '久备不孕'
          }]
        }, {
          value: 104,
          label: '备孕饮食',
          children: [{
            value: 10401,
            label: '补充叶酸'
          }, {
            value: 10402,
            label: '饮食禁忌'
          }, {
            value: 10403,
            label: '营养饮食'
          }]
        }, {
          value: 105,
          label: '二胎高龄',
          children: [{
            value: 10501,
            label: '二胎备孕'
          }, {
            value: 10502,
            label: '高龄备孕'
          }]
        }]
      }, {
        value: 2,
        label: '孕期',
        children: [{
          value: 201,
          label: '胎儿发育',
          children: [{
            value: 20101,
            label: '发育周刊'
          }, {
            value: 20102,
            label: '发育重点'
          }, {
            value: 20103,
            label: '发育异常'
          }]
        }, {
          value: 202,
          label: '孕期疾病',
          children: [{
            value: 20201,
            label: '孕期常见病'
          }, {
            value: 20202,
            label: '孕期用药'
          }, {
            value: 20203,
            label: '特殊孕妈疾病'
          }]
        }, {
          value: 203,
          label: '孕期饮食',
          children: [{
            value: 20301,
            label: '每周饮食重点'
          }, {
            value: 20302,
            label: '饮食技巧'
          }, {
            value: 20303,
            label: '孕妈营养'
          }, {
            value: 20304,
            label: '特殊孕妈饮食'
          }]
        }, {
          value: 204,
          label: '孕期护理',
          children: [{
            value: 20401,
            label: '身体变化'
          }, {
            value: 20402,
            label: '日常护理'
          }, {
            value: 20403,
            label: '特殊孕妈护理'
          }]
        }, {
          value: 205,
          label: '孕期产检',
          children: [{
            value: 20501,
            label: '每次产检重点'
          }, {
            value: 20502,
            label: '产检项目'
          }, {
            value: 20503,
            label: '特殊孕妈产检'
          }]
        }, {
          value: 206,
          label: '临时分娩',
          children: [{
            value: 20601,
            label: '产前准备'
          }, {
            value: 20602,
            label: '顺产刨宫产'
          }, {
            value: 20603,
            label: '分娩过程'
          }, {
            value: 20604,
            label: '特殊孕妈分娩'
          }]
        }, {
          value: 207,
          label: '孕期安全',
          children: [{
            value: 20701,
            label: '胎儿安全'
          }, {
            value: 20702,
            label: '孕妈安全'
          }]
        }, {
          value: 208,
          label: '胎教时光',
          children: [{
            value: 20801,
            label: '每周胎教重点'
          }, {
            value: 20802,
            label: '胎教方法'
          }]
        }, {
          value: 209,
          label: '妈妈成长',
          children: [{
            value: 20901,
            label: '宝宝起名'
          }, {
            value: 20902,
            label: '购物消费'
          }, {
            value: 20903,
            label: '情感心理'
          }, {
            value: 20904,
            label: '孕妈时尚'
          }, {
            value: 20905,
            label: '职场孕妈'
          }, {
            value: 20906,
            label: '孕妈出行'
          }, {
            value: 20907,
            label: '孕妈运动'
          }, {
            value: 20908,
            label: '居家生活'
          }]
        }]
      }, {
        value: 3,
        label: '0-1月',
        children: [{
          value: 301,
          label: '坐月子',
          children: [{
            value: 30101,
            label: '月子饮食'
          }, {
            value: 30102,
            label: '产后护理'
          }, {
            value: 30103,
            label: '恶露'
          }, {
            value: 30104,
            label: '月子禁忌'
          }]
        }, {
          value: 302,
          label: '新生儿护理',
          children: [{
            value: 30201,
            label: '新生儿睡眠'
          }, {
            value: 30202,
            label: '脐带护理'
          }, {
            value: 30203,
            label: '新生儿抚触'
          }, {
            value: 30204,
            label: '新生儿洗澡'
          }, {
            value: 30205,
            label: '囟门'
          }, {
            value: 30206,
            label: '胎便'
          }]
        }, {
          value: 303,
          label: '新生儿喂养',
          children: [{
            value: 30301,
            label: '开奶'
          }, {
            value: 30302,
            label: '乳汁淤积'
          }, {
            value: 30303,
            label: '日常喂养'
          }]
        }, {
          value: 304,
          label: '新生儿疾病',
          children: [{
            value: 30401,
            label: '黄疸'
          }, {
            value: 30402,
            label: '湿疹'
          }, {
            value: 30403,
            label: '感冒发烧'
          }, {
            value: 30404,
            label: '其他疾病'
          }]
        }, {
          value: 305,
          label: '宝宝早教',
          children: [{
            value: 30501,
            label: '早教方法'
          }, {
            value: 30502,
            label: '能力与发展'
          }, {
            value: 30503,
            label: '亲子关系'
          }, {
            value: 30504,
            label: '二胎宝宝'
          }]
        }]
      }, {
        value: 4,
        label: '1-12月',
        children: [{
          value: 401,
          label: '宝宝发育',
          children: [{
            value: 40101,
            label: '发育标准'
          }, {
            value: 40102,
            label: '身高体重'
          }, {
            value: 40103,
            label: '头部发育'
          }, {
            value: 40104,
            label: '肢体发育'
          }, {
            value: 40105,
            label: '乳牙发育'
          }, {
            value: 40106,
            label: '性别差异'
          }]
        }, {
          value: 402,
          label: '宝宝喂养',
          children: [{
            value: 40201,
            label: '喂养月刊'
          }, {
            value: 40202,
            label: '母乳喂养'
          }, {
            value: 40203,
            label: '奶粉喂养'
          }, {
            value: 40204,
            label: '混合喂养'
          }, {
            value: 40205,
            label: '辅食喂养'
          }, {
            value: 40206,
            label: '宝宝营养'
          }, {
            value: 40207,
            label: '特殊宝宝喂养'
          }]
        }, {
          value: 403,
          label: '宝宝护理',
          children: [{
            value: 40301,
            label: '排便护理'
          }, {
            value: 40302,
            label: '身体不适'
          }, {
            value: 40303,
            label: '四季护理'
          }, {
            value: 40304,
            label: '护理禁忌'
          }, {
            value: 40305,
            label: '防蚊防虫'
          }, {
            value: 40306,
            label: '牙齿护理'
          }, {
            value: 40307,
            label: '私处护理'
          }, {
            value: 40308,
            label: '手部护理'
          }, {
            value: 40309,
            label: '皮肤护理'
          }, {
            value: 40310,
            label: '五官护理'
          }, {
            value: 40311,
            label: '头部护理'
          }, {
            value: 40312,
            label: '穿衣技巧'
          }, {
            value: 40313,
            label: '睡眠护理'
          }, {
            value: 40314,
            label: '宝宝抚触'
          }, {
            value: 40315,
            label: '洗头洗澡'
          }, {
            value: 40316,
            label: '特殊宝宝护理'
          }]
        }, {
          value: 404,
          label: '宝宝疾病',
          children: [{
            value: 40401,
            label: '发烧'
          }, {
            value: 40402,
            label: '用药方法'
          }, {
            value: 40403,
            label: '疫苗接种'
          }, {
            value: 40404,
            label: '就医指南'
          }, {
            value: 40405,
            label: '疾病筛选'
          }, {
            value: 40406,
            label: '生病征兆'
          }, {
            value: 40407,
            label: '其他疾病'
          }, {
            value: 40408,
            label: '疹子/痱子'
          }, {
            value: 40409,
            label: '咳嗽'
          }, {
            value: 40410,
            label: '便秘'
          }, {
            value: 40411,
            label: '感冒/流感'
          }, {
            value: 40412,
            label: '腹泻'
          }, {
            value: 40413,
            label: '免疫力'
          }]
        }, {
          value: 405,
          label: '宝宝安全',
          children: [{
            value: 40501,
            label: '居家安全'
          }, {
            value: 40502,
            label: '出行安全'
          }, {
            value: 40503,
            label: '户外安全'
          }, {
            value: 40504,
            label: '吞食异物'
          }, {
            value: 40505,
            label: '外伤处理'
          }, {
            value: 40506,
            label: '危险物品'
          }, {
            value: 40507,
            label: '急救指南'
          }]
        }, {
          value: 406,
          label: '宝宝早教',
          children: [{
            value: 40601,
            label: '早教月刊'
          }, {
            value: 40602,
            label: '运动早教'
          }, {
            value: 40603,
            label: '父母教育'
          }, {
            value: 40604,
            label: '艺术启蒙'
          }, {
            value: 40605,
            label: '社交认知'
          }, {
            value: 40606,
            label: '情绪认知'
          }, {
            value: 40607,
            label: '认知能力'
          }, {
            value: 40608,
            label: '语言发展'
          }, {
            value: 40609,
            label: '精细动作发育'
          }, {
            value: 40610,
            label: '大动作发育'
          }, {
            value: 40611,
            label: '二胎宝宝'
          }]
        }, {
          value: 407,
          label: '早产儿',
          children: [{
            value: 40701,
            label: '发育月刊'
          }, {
            value: 40702,
            label: '早产儿喂养'
          }, {
            value: 40703,
            label: '早产儿护理'
          }, {
            value: 40704,
            label: '追赶生长'
          }, {
            value: 40705,
            label: '早产儿疾病'
          }]
        }, {
          value: 408,
          label: '妈妈成长',
          children: [{
            value: 40801,
            label: '购物消费'
          }, {
            value: 40802,
            label: '情感心理'
          }, {
            value: 40803,
            label: '妈妈时尚'
          }, {
            value: 40804,
            label: '亲子出行'
          }, {
            value: 40805,
            label: '妈妈运动'
          }, {
            value: 40806,
            label: '职场妈妈'
          }, {
            value: 40807,
            label: '全职妈妈'
          }, {
            value: 40808,
            label: '居家生活'
          }]
        }]
      }, {
        value: 5,
        label: '1-3岁',
        children: [{
          value: 501,
          label: '宝宝早教',
          children: [{
          }]
        }, {
          value: 502,
          label: '宝宝饮食',
          children: [{
          }]
        }, {
          value: 503,
          label: '宝宝疾病',
          children: [{
          }]
        }, {
          value: 504,
          label: '宝宝安全',
          children: [{
          }]
        }, {
          value: 505,
          label: '宝宝护理',
          children: [{
          }]
        }, {
          value: 506,
          label: '妈妈成长',
          children: [{
          }]
        }]
      }, {
        value: 6,
        label: '3-6岁',
        children: [{
          value: 601,
          label: '宝宝早教',
          children: [{
          }]
        }, {
          value: 602,
          label: '宝宝饮食',
          children: [{
          }]
        }, {
          value: 603,
          label: '宝宝疾病',
          children: [{
          }]
        }, {
          value: 604,
          label: '宝宝安全',
          children: [{
          }]
        }, {
          value: 605,
          label: '宝宝护理',
          children: [{
          }]
        }, {
          value: 606,
          label: '妈妈成长',
          children: [{
          }]
        }]
      }],
      labelOptions: [{
        'label': '湿疹',
        'value': 1
      }, {
        'label': '保湿',
        'value': 2
      }, {
        'label': '护肤',
        'value': 3
      }],
      categoryProps: {
        'multiple': false,
        'label': 'label',
        'value': 'value',
        'children': 'children'
      },
      editableTabsValue: 'fix',
      editableTabs: [{
        title: '预览1',
        name: '1',
        content: '预览1'
      }, {
        title: '预览2',
        name: '2',
        content: '预览2'
      }],
      tabIndex: 2
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getCategoryOptions()
  },
  mounted () {},
  methods: {
    saveForm () {
      this.$refs['elForm'].validate(valid => {
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        // TODO 提交表单
      })
    },
    submitForm () {
      this.$refs['elForm'].validate(valid => {
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm () {
      this.$refs['elForm'].resetFields()
    },
    getCategoryOptions () {
      // 注意：this.$axios是通过Vue.prototype.$axios = axios挂载产生的
    },
    uploadBeforeUpload (file) {
      let isRightSize = file.size / 1020 / 1020 < 200
      if (!isRightSize) {
        this.$message.error('文件大小超过 200MB')
      }
      return isRightSize
    },
    handleTabsEdit (targetName, action) {
      if (action === 'add') {
        let newTabName = ++this.tabIndex + ''
        this.editableTabs.push({
          title: '预览' + newTabName,
          name: newTabName,
          content: '预览' + newTabName
        })
        this.editableTabsValue = newTabName
      }
      if (action === 'remove') {
        this.tabIndex = --this.tabIndex
        let tabs = this.editableTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        this.editableTabsValue = activeName
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
