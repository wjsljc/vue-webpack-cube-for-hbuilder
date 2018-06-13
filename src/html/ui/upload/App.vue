<template>
  <div class="upload">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="基础示例">
          <cube-upload
            :action="uploadConf1.action"
            :simultaneous-uploads="uploadConf1.number"
            @files-added="filesAdded"
          />
        </base-row>
        <base-row title="压缩上传(研究中)">
          <cube-upload
            ref="upload"
            :action="uploadConf2.action"
            :simultaneous-uploads="uploadConf2.number"
            :process-file="processFile"
            @file-submitted="fileSubmitted"
          />
        </base-row>
        <base-row title="自定义结构样式(限定1个实例)" class="upload-box2">
          <cube-upload
            ref="upCostume"
            v-model="uploadConf3.files"
            :action="uploadConf3.action"
            @files-added="addedHandler"
            @file-error="errHandler"
          >
            <div class="clear-fix">
              <cube-upload-file v-for="(file, i) in uploadConf3.files"
                                :file="file"
                                :key="i"
              >
              </cube-upload-file>
              <cube-upload-btn class="upload-btn" :multiple="false">
                <!--添加按钮自定义区域-->
                <div>
                  <p>点击按钮上传<i>＋</i></p>
                </div>
              </cube-upload-btn>
            </div>
          </cube-upload>
        </base-row>
        <base-row title="上传操作项">
          <cube-upload
            ref="uploadClick"
            :action="uploadConf4.action"
            :simultaneous-uploads="uploadConf4.number"
            :auto="uploadConf4.auto"
            @files-added="filesAdded"
            @file-submitted="fileSubmitted"
            @file-removed="fileRemoved"
            @file-success="fileSuccess"
            @file-error="fileError"
            @file-click="fileClick"
          />
          <div class="btn-row flex-allCenter">
            <cube-button class="flex-1" @click="submit">上传</cube-button>
            <cube-button class="flex-1" @click="pause">暂停</cube-button>
            <cube-button class="flex-1" @click="retry">重试</cube-button>
          </div>
        </base-row>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'
  import compress from 'image'

  export default {
    mixins: [webviewMixin],
    data () {
      return {
        uploadConf1: {
          action: '//jsonplaceholder.typicode.com/photos/',
          number: 1
        },
        uploadConf2: {
          target: '//jsonplaceholder.typicode.com/photos/',
          number: 1,
          prop: 'base64Value'
        },
        uploadConf3: {
          action: '//jsonplaceholder.typicode.com/photos/',
          files: []
        },
        uploadConf4: {
          action: {
            target: '//jsonplaceholder.typicode.com/photos/'
          },
          number: 1,
          auto: false,
          progress: 0
        }
      }
    },
    methods: {
      filesAdded (files) {
        console.log('filesAdded')
        console.log(files)
        let hasIgnore = false
        const maxSize = 1 * 1024 * 1024 * 1024 // 1024M
        for (let k in files) {
          const file = files[k]
          console.log(file)
          if (file.size > maxSize) {
            file.ignore = true
            hasIgnore = true
          }
        }
        hasIgnore && this.$createToast({
          type: 'warn',
          time: 1000,
          txt: 'You selected >1024M files'
        }).show()
      },
      processFile (file, next) {
        console.log('processFile')
        compress(file, {
          compress: {
            width: 1600,
            height: 1600,
            quality: 0.5
          }
        }, next)
      },
      fileSubmitted (file) {
        console.log('fileSubmitted')
        console.log(file)
        this.uploadConf4.progress = file.progress
        file.base64Value = file.file.base64
      },
      fileRemoved () { // 文件被删除
        console.log('fileRemoved')
        this.$createToast({
          type: 'warn',
          time: 1000,
          txt: '文件被删除'
        }).show()
      },
      fileSuccess () { // 文件上传成功
        console.log('fileSuccess')
        this.$createToast({
          type: 'correct',
          time: 1000,
          txt: '文件上传成功'
        }).show()
      },
      fileError () { // 文件上传失败
        console.log('fileError')
        this.$createToast({
          type: 'error',
          time: 1000,
          txt: '文件上传失败'
        }).show()
      },
      fileClick () { // 文件被点击
        console.log('fileClick')
        this.$createToast({
          type: 'warn',
          time: 1000,
          txt: '文件被点击'
        }).show()
      },
      addedHandler () {
        const file = this.uploadConf3.files[0]
        file && this.$refs.upCostume.removeFile(file)
      },
      errHandler () {
        // const msg = file.response.message
        this.$createToast({
          type: 'warn',
          txt: 'Upload fail',
          time: 1000
        }).show()
      },
      submit () {
        this.$refs.uploadClick.start()
      },
      pause () {
        this.$refs.uploadClick.pause()
      },
      retry () {
        this.$refs.uploadClick.retry()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  @import "~assets/css/flex.styl"
  html, body, .upload {
    height 100%
    background-color $color-background
  }

  .upload {
    .scroll-box {
      padding-bottom 20px
      .upload-box2 {
        .cube-upload {
          .cube-upload-file, .cube-upload-btn {
            margin: 0
            height: 200px
          }
          .cube-upload-file {
            margin: 0
            + .cube-upload-btn {
              margin-top: -200px
              opacity: 0
            }
          }
          .cube-upload-file-def {
            width: 100%
            height: 100%
            .cubeic-wrong {
              display: none
            }
          }
          .cube-upload-btn {
            display: flex
            align-items: center
            justify-content: center
            > div {
              text-align: center
            }
            i {
              display: inline-flex
              align-items: center
              justify-content: center
              width: 50px
              height: 50px
              margin-bottom: 20px
              font-size: 32px
              line-height: 1
              font-style: normal
              color: #fff
              background-color: #333
              border-radius: 50%
            }
          }
        }
      }
      .btn-row {
        height 50px
        button {
          margin 0 5px
          &:nth-of-type(1) {
            margin-left 0px
            margin-right 7px
          }
        }
      }
    }
  }
</style>
