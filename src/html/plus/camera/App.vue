<template>
  <div class="camera">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="基础使用">
          <cube-button type="submit" @click="camera">选取照片</cube-button>
          <div class="photo" id="photo" v-show="photoInfo.flag">
            <img :src="photoInfo.path" alt=""/>
          </div>
        </base-row>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'

  export default {
    mixins: [webviewMixin],
    data () {
      return {
        photoInfo: {
          path: '',
          flag: false
        },
        loading: null
      }
    },
    methods: {
      camera () {
        this.$createActionSheet({
          title: '照片选取',
          active: 0,
          data: [
            {
              content: '拍照'
            },
            {
              content: '从相册选取'
            }
          ],
          onSelect: (item, index) => {
            if (item.content === '拍照') {
              this.picture()
            } else {
              this.album()
            }
          },
          onCancel: () => {
            this.$createToast({
              txt: `Clicked canceled`,
              type: 'warn',
              time: 1000
            }).show()
          }
        }).show()
      },
      picture () {
        this.loading = this.$createToast({
          time: 0,
          txt: '加载中',
          mask: true,
          type: status
        })
        this.loading.show()
        let self = this
        let cmr = plus.camera.getCamera();
        let res = cmr.supportedImageResolutions[0]; //支持照片的分辨率
        let fmt = cmr.supportedImageFormats[0]; //照片的格式
        cmr.captureImage(function (path) {
          console.log("Capture image success: " + path);
          self.compressPhoto(path); // 压缩并写入图片
        }, function (error) {
          console.log("picture error " + JSON.stringify(error))
          self.loading.hide()
        }, {
          resolution: res,
          format: fmt
        });
      },
      album () {
        let self = this
        self.loading = this.$createToast({
          time: 0,
          txt: '获取中',
          mask: true,
          type: status
        })
        self.loading.show()
        // 从相册中选择图片
        console.log("从相册中选择图片:");
        plus.gallery.pick(function (path) {
          console.log(path);
          self.compressPhoto(path); // 压缩并写入图片
        }, function (e) {
          console.log("取消选择图片 " + JSON.stringify(e));
          self.loading.hide()
        }, {
          filter: "image"
        });
      },
      compressPhoto (path) {
        let self = this
        plus.io.resolveLocalFileSystemURL(path, function (entry) {
          let src = entry.toLocalURL();
          console.log("src " + src);
          let random = Date.parse(new Date());
          /*压缩图片*/
          plus.zip.compressImage({
            src: src,
            dst: "_doc/signature_" + random + ".jpg",
            overwrite: true, //是否覆盖源文件
            quality: 100,
            width: "300px",
            height: "360px"
          }, function (zip) {
            self.loading.hide()
            let size = zip.size;
            console.log("filesize:" + zip.size + ",totalsize:" + size);
            if (size > (10 * 1024 * 1024)) {
              this.$createToast({
                txt: `照片超出大小限制`,
                type: 'warn',
                time: 1000
              }).show()
              return
            }
            self.photoInfo.path = zip.target  // 赋值照片文件路径
            self.photoInfo.flag = true
            console.log("文件路径 " + self.photoInfo.path)
          }, function (zipe) {
            self.loading.hide()
            self.$createToast({
              txt: `压缩失败`,
              type: 'warn',
              time: 1000
            }).show()
          });
        });
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .camera {
    height 100%
    background-color $color-background
  }

  .camera {
    .scroll-box {
      padding-bottom 20px
      .photo {
        width 85%
        margin 20px auto
        img {
          width 100%
        }
      }
    }
  }
</style>
