import { inputBlur } from 'assets/js/utils'

const uConst = {
  common: {
    loadingView: {
      data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABYCAYAAAADWlKCAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAKwwAACsMBNCkkqwAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOS8xMi8xM5w+I3MAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzVxteM2AAACcklEQVR4nO3a0XESURiG4TeO99iBWoGZ+RvADtKBpAPtwBLsANJBrEAs4MyYDmIHSQXkgk0mMLK7ILt8/+F778ici394OGfDsher1Qqn05tTD+A2M4hYBhHLIGIZRCyDiGUQsQwilkHEMohYBhHLIGIZRCyDiGUQsQwilkHEMohYBhHLIGIZRCyDiGUQsQwilkHEMohYb089wNCVUq6Ay+blfUQsTjhOZxc1P9tbSlkAX7b+/C0ifpxgnF5Ve2TtwAD4OvIoe1UlSAsGwPsRR9m76kA6MAD+jjTKQVUF0gMD4HaEUQ6umot6T4ybiJgNP83hVbFDasGACnZIT4yfEXE1wjj/Xeod0hPjDpgNPsyRSguyB8Y0Ih6Gn+g4pQSpFQMSgtSMAclAaseARCDngAFJQM4FAxKAnBMGiH8xLKVMgV89ln6MiPthpxkn6R0SEUvgusfSZSnlsnuZftI75LlSygyYdyx7ZH1s/Rl+ouFKAQIvx9ctMGlZlh4lDQhAcywtqRhF+hqyXfMmT1m/6buasL6mzMaY6dilAoENlLuWZRNgnhEl1ZH1ulLKO9bH16eOpdfqz2K9Lt0Oea75EjilfadAsp2SFgQ2UH53LJ2XUr4PPtARSntkbVfL7+rVgEBvlM/NHQDJUh9Z2zWf/puOZbPhJzm8qkDgBaXt/teHcSY5rOpAAJp/c/vclJSrShDYifKI+NPvVV3U/1VzU3LavFyo/25SPUi2qj2ysmYQsQwilkHEMohYBhHLIGIZRCyDiGUQsQwilkHEMohYBhHLIGIZRCyDiGUQsQwilkHEMohYBhHLIGIZRCyDiGUQsZ4Ak9fPFwUy/HsAAAAASUVORK5CYII='
    },
    titleNView: { // 还有buttons coverage homeButton(不推荐使用) tags(不推荐使用)
      autoBackButton: true, // 标题返回按钮
      backgroundColor: '#222', // 背景颜色
      titleColor: '#ffcd32', // titleColor
      progress: { // 标题栏控件底部进度条
        color: '#ffcd32',
        height: "2px"
      },
      splitLine: { // 标题栏控件的底部分割线
        color: 'rgba(255, 205, 49, 0.5)',
        height: "1px"
      },
      titleOverflow: "ellipsis", // ellipsis和clip标题栏控件的标题文字超出显示区域时处理方式
      titleText: null, // 标题文字(设置为null才能以页面title为基准)
      titleSize: "17px",
      type: "default" // 标题栏控件样式 default和transparent
    }
  },
  timeStamp: {
    now: new Date(),
    nowDayOfWeek: new Date().getDay(), // 今天是本周的第几天
    nowDay: new Date().getDate(), //当前日
    nowMonth: new Date().getMonth() + 1, //当前月
    nowYear: new Date().getFullYear() //当前年
  },
  index: {
    loadingView: {
      data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALIAAAA7CAYAAADfNdB4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpERUZFMzAwNDFDNTYxMUU4ODJGMUJBRDJEQjQyNjk3NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpERUZFMzAwNTFDNTYxMUU4ODJGMUJBRDJEQjQyNjk3NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRFRkUzMDAyMUM1NjExRTg4MkYxQkFEMkRCNDI2OTc1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRFRkUzMDAzMUM1NjExRTg4MkYxQkFEMkRCNDI2OTc1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+h5BiRwAAFIFJREFUeNrsXQF2I7cOE/z+/Y/UoxW/a48kAOQkzsZOnG23L203ccbjEUWCIEjhr7/+Gh/6w3++cPe3f+afXx+EuH0e+LcHbt/AP/8l11+vP8T6H/izuP4Mcmkcv3f77vF2629Yl4G8736T43Wc73n90QW3ez7eGAD0nte9Q64/1ov9Pf0667X++X997zLkI9/uHccrQXkOkHufr70cf+eQq499ycvVqiDPe98r1zXhv9Yb5uki3//t8+u88h/Oh+WfjtdFPl7CYxE4XwF5CvQPTnkSyzhxXevlBKgvpz28uBPOF1xtRe4LoLyWw25pfbteFBTD5jTSfa9lEQ+j5XwPMa11/5zPahoi96Y9nsftCtgf7LD/sX6+b9cevH6P7xgyHujcfqAln/z39rDXGgOtjeCNS05ToxjU4QTHNIllP13k47QyHlb9a/Epm2te9vgh874hv8v9M657uv777zccEeTGeOxC8DDN2CcU+5v2jeN11/ud9z4N93is9DAnxj/kldsDXMZ/f042H9YCq3VCV1Ash8vDHD8C+x1Nt+7puKY3NOdNNYh5M9s612YQfMOziLg30tV85K25zey4g+n1ePtMv66vG5DHaxZ24f4fhIF5oDsuj2OzGnaTzXHEN+oDOX6BI8PT7ZV/gCHzKVdcYQ4aqXfcWw6InM+aR2yfv07qLjAIIkkF1UAO7C3eX5d5hmESZr/ToKEuWMzRvmSnsNvC22aGusPtLZEfyQyX/tdtkIp4jqczPfQ4ogrFfW9UMrc5Y40g8OXHeWQ+ALzcafgzllG91S9DBSPDJZZ7Uo99XTAOBbOHV4L4Rr0ljL2YHAYQx3KR+Z109rRYLE+nhheMdPKH9+U0RFaI8N7jhN8b9Q65NwBnrqAfSTbJtmHsZ8X1yNcz1NTwB5nvAxA3y/LxDF9w7Ae57gPcXhRjYcPbQ6Z5JpqFIUI8ms+E5c2x7YAzZk9sOpNM7JRrXRjwZJGSbDKskholEE8XYfRw8MLw7GxSCtm/Ho0WBGHaeEUlV08tBk7PTXDAnB9hyPjcHvAv3OmSKV5BFvrXQ93hMHxebAs0vvCGBEjMlcT2+CvpchR9+0cN5wj9E994UkWh+uhJIzYOp1gbNRKQbaa57lKxLAXwTOrl+nw4NHMA9bMIHTeTvkFhOzwaAbDNc0MlHrn4XGjxo4g3dl9UN0XJ0N8K7YiMfmJfDsPJFVYUJ1g8WSZuA/UmFuxGjQI4klMIZ03xuDTGbSd8N758x3sqtYc0fgqrEQgZEMjCyoIID7l2Op1SBGsSjeca8h9RHnEOa2bd6oWhkRDqulZRoFB4Q2PuTtG4iOEOHzvbxwUvaAbNjX3Bw3cDVxgPjm2YRliIp71GnA3+Fwc82Qpyk77I+8IpaSnke3r8Ha/QuBac4Ht5Ks/2yA/3lGfenm98PWQrLjzC/Uwp7g/CGtA8IQyaW2GDfLNIkX/f2aYnQ0SHa2nVE6M/qru/biCWCEC5L9QkUQgQUnKENDGOk+KOwA/AsfZEXdjJXS4Kjmc4o8zlhQz1A4aIL7u5LmnJVdGFSG9KqTr4giivJzzwTgZxze5wWy/cHOM2DjZ7mg11cKSDaw86qXF4PScLi+9DVjVkFy22Y2PsmR8Tm6UhTu5RowS8QmppLI3rWfv6oKV5+cT6PsJYXxxys3q9I9OCsg8MZgVDyqy6HBD6mM1HojJQq0gyGnpte2b0m8MC7w2HMr2kRgRsyg2FZ0Y4kR2aboYK25MrgVt2LzCkNQvcdumqLtKR3C0xobL5ahQ88cj8nPE9yeKe64Rx8iX2TAMahFMVe6FuSJdL2TMAycq1WjdTLag3PLyTp0ObRqlla1q5e+RCZSXREA89kmA4lJgZAmmlZssRpsfnZjJQlo3DGMHDWnk8Ks3+EPgBk1lpPsfcU7+ucLnfCvkSFve1qR6K51v+iAwftTzzkbdRLBy+XUYmevAdhMQlWmRhs6CotBVF6DSosX4goDkCq1MMByE+Anqk2/nroeQcsIAvkeIqGgw3fYYmtWMMqT1JBfRDBZHfN9AnowK861E/eeNYXlKSPIyhJOj1NVByQ3Fqw81iuLGw5u5QaSgRC74/4n5vZl62uDiOURIw6O/wTdrB6jyCardOA+v7STdvflq/xva2mg3zUPE1Pn3wzJAeUBC5C4bgPkP8TmB8cv9sRZpX0n9AkjwYRcSxF2PZO2fxIbnfrfui8reyT9BoNjI5w8yWpifuMHjKPLmvyb1XzMC2aq0vmKChZVbxk1qkhkGSbgnYqUZVd4F4BvLayycX/vk07heyE2/+HEEPSIib1THo4kpShikAj1QFYcQqaVzCOiI8HE5uHMYeWOBIgxk8+GI4HUgKFZeuHXX5uV0xokgyQ77CALyhlbHE9ky/PSKC0D0yv84wv5zCe9B24eJKS60kebpRKrmWtrkuHGafDAJCPft06/BAMUqJkNVrG3tm5IrqrM9E9MF+iHiaGKaM61wcFRyIUW64IF4bbBhOLpZHq6DU+yqsBX+kEX9JYDhIXA9zS6sICGiFSOV3P47gQqCCUAwXrKd3KqUGDq1Fm9h8aTGQ5RRtOWLTA6Msw5SCbDZimRycdRmqlTjBsIrUGBi4RryEP7bVj3z4molPah2XP5VweMqO0a4OapkvMCxYcJ7nUWp8u/pGFVuYvhdR5zDhxgrbi/0gDWWsaiN3SZoJSCkyOxEiMUvIpnqDqJ2GiYOGQaVh2L3ygxAZhW9OLBcylq6DgtWv+u1/vv+/9xbvX2DbdyCLLXWB51SpD6DY4AK5Kpa/SPXugrEEOXrtRTYjIQqGB+ddSbNNoc2vrJRfboqZiIGuAVltUUax7KZbHEngZQTjkQokCGiQ6r33tUD+j+X+BjtufFcEL7+5wvhBRvre1wcQDErVIbVw3paxleSqBxrWTOKGurJ+EVMwqnSuF8Uo+jjTPHvYn+1G6BTyRwc0ivektBWFzW7JHygN3qab4FYAITqhtPNFlYWD/f4b2lm+nteNR/4k78pXM9S3EsFPvJHXNtz0jkCaYwDoxWLL382lp7pu4mUvL+wQjt1cqoo8ZrbF3YIv/VOWt2YDbXLVGFrAONzmzgGILeWHwXHuJNmSY2yl32DTQT6KwpBk7z3Fa18eY0tfbfN8NCX4LvPRqBeCk6CF5kM/CeueXtHZlW+rQ/gEy8GKKgfVp8WxVTyDcNrGFI5Sa1MtBGnYG5GcKdWS1bZVXic9aQsmR/Gy0YoSJVbu4b1b0ZjbSAI/rX7jg2yeT9w87xgs7313OB1k7fjqt0m5uGPOncAhLr3xIeUfrTVsnnh7KQa3zShmRMWiUnYyVmCKMBiC+1LVAo3lOy9yNO0u8syWAJ9nyRiNbecb+m3ys4b8GsMvPgUb8NFX0ts5D89CTccWxYmTN+KWHliWP6bayGWMLloaUiBAEsMSmp1tsZkmgIVsbdjD0GoiisR5KEOxeG3/sKvx0NiPzZyAqkVODI/lAD6i3/7p4wC+DKBjdCxCFRU6z1r6pLbxWmUNVSA0Eg4g6GVvnze+ViEIjR3unxojmRwivQyRRU5gYsG228gzB2AUX7LhlGuTY0GXiuWrfhvjvwEt9+8YcpMF7KktDJn70HgObY1PnajRZ8LDps6sRQ2WL8K8O9HAC0vOQg0kmYDyv6VjGzkU79AmF/12bOgSMZxTx1DM7gnfmX6bP8uQ+Uxn+y49twYNIpsykARcsFsx1yE+zzRhoHq55Dp0LsRocXh4v9AkIEosOpYKkViysC80o6Oo/bRKbp7ZNmpNOGf7y8jNo0+XDOYoXsffGZn17Uzbb9/XW4Z6F8ZO7BnOqNDMu0kEVXA0dls7oh9DS9VOm2AlNlBBDXByX5VDLiTwGD4WTE2MPljjrQeOwZpYhv4xwE3AMBzcM06IT68kqvhq/s7lUbb0rdbdZbz8GL32kc1sWNJwqQA39ljSIIBN94TwuCy/iVGxptJy5mHZ6x7IUURGkHkYRfC7ysBvN8dSChPWrzgoElDG6APa59bnihywGE5Cx/6+O1b2sebMr7dvPPSefApLwgvEAJOlIZqt9Dklcw8CHNpy35Sz1MCHVv6GNXUL08Aq+YSYW6IcyJXgbZ8oY0FPPLESh4CnuWWEQsAMZW9Mqi8GTrh+m6Ge45dh5Ee48kczbLi3KNLACHjSxaHSFqvKtnfdJISctBt9hrAORPFr0rjjNQVJfzTdLGuT1O5JdmiTtJkloDG2gx2/mIUQnwvr1+Tw2WLCRgB13aFNr9Hr/YOSPXy7q7cyLNqBflj6MRFX6ADu84ldLGTHgsFlSmaQ1HN0hXKyCJ8ZRTquiflC7Sk3bDjIu6Rzo9lLZYNVFWasYwovtGXLG1YLhz9H3c5G4H8D/fZwY+ce5bMfagxBUY0BGVmldUDo73jbAxfrtNAtmTi5cCs6NouNOOhIL9nMY16z2BJLezgfDV4vsCOVL2ALyyA4WScga7m+129zjTj4MUMMX2krLJ0OYeXipNSSbObIOT2I8DzPy9CDQbjOKtnjrRyvUgvtZGFQrBVpwYnJ+waOhWg4AOsOR3OqBL3/w/8rW287XXiLmIjqW68b8MGUhjJMckQXNV/cEX6fr0b1yECX5GPJcGFdIYxihITvnNdgI1mnl26gBU8UbAjsCp+lcXv5HP9On0LAI7Rw2JiCoFvMt6OBRHvCR0axAGn6WU10RNNx7MMBZPZccMyX51kEnm34n98paLhm3qFXZp0fq91Fa0qAJv2qnXxDIKNaGzsIxgZwJz3dhPldZ8H6h67orDRaDuBmSdL2X3wA936A2BtXGRdj9xxGWZuhda9K8hFdNxyu3748xnwfNoD7+ykT3PljOcJr87aMgWXbKgHpVYvwqQO40c5XbhKkiATd7i4DuKNbe2gHCLTkwL4YaRGAoakeMjTRE78k0TkbVoF2jh1bcqdpyVnU3scxMp5WH8GnfvN5Q1pONu8U7Vj6AdSueQmPNoBbVXQ+gHt5UoqjJ5eoPVzyyaBS5ADuGMq5T+3xzSSBqXSD0wVBPr1eoUUUw9EkhRhFvx1KVTnsx6MBtTH2EwWRV+Lj8GAbPeeS2TkmH86HOBSOOcNirywI6tj2Hf71TD8Z4FIGcAteRINhVXyjHo/0SUCEVw6po6mWRplStEEztZMZAyzxXRPeUKXHPnmePd3OyruMKO3/x1rca+Rtnw3DBFzOknPS0GT7m36WGWeW8atCOAZwj13Spqnf6EUFaX4FOlG/JmBZE6ZPE2rq1AoFNguxIwftV1NbgujPC1xuXTVVvz3v9/Lo9f5G/uFpA7/7eFAdNTScJ7SwAkBWPeLsBPSoqwzg1lyw3NceKkM2NbjJSpNGxZ0N4J7em3K4SlbCr4GFqFVyeSgILcaqWuosIbn+HtUV+u3w3w82ZHyX8X4LU3eisTHLZpfQysy1lbMg+FcxeI7RHrKTlcZtnzqAe+xzPpQRMe1oP08tG8FW9wu3px02rZ79kcFWhtbkDd77KlBol87hpxEzCzQvDi1ejYUuTpLmIzu0UTxhHpNANAapg8ILu1F77Uin1synZ1MFZa5cugAEe8umDG6zKjJAoTATQfPsOcsh0bbYFh3Tc3bGjgaosEnoN36VKT5/yvKnxEV3sx44WqQp2gRQ5xH3mJq68OwOyJH5E3KYzj77esZY2BRCPz2MfrwaujuRyUZ2IM4WzTsXnulYap2dOy7S1VkkGnFQpEYCUQ3aVCXZ8XGy36J2vvxUJzzd++JLAoOObBqC7awYDS1Xnw0R2IatRYFkhskocbM7HriBGb9W+u/D/o3GZks6c8QcuDV+q1exoRQzZFyyENngsCOvLW+cAxpJUf9FknxEg9Qxz2T3JaAFPv/rX8klpwTLsV3OuCJGGfxLpe+6CztWLHBTNkmnMUYe6q7e1cYTjAJXNjpicBYiehfYkUfrdmf07GOjYeTHohIBOR2AzenTeryZ6LwlYlx+bwEfLyj7ch6Zj7iRCZSxp3ByFzJscaUTQ51bnvo5pPO5HknjugYc8CAAiqOJGMC9lclct86B08+vBr3nNsfkjRjAXSrxhHeANEc+lMTZDlsp5zEU/fblW3zoveH7mRe/T26vA2T7jQOn3zJkr6mG6N8DQrvd+GAsv+iZelbx4cehMai/ZiDg9twINoJVVVoK5PThjIiji2XQC8q26tbC3xB57CvhRRrgdGXJFy+I4LnX+BD8OMX22uvG7mrsBLgGTG3+WdfOs+Yhv7FFkXJLnrQystQ2eJoD1LEw9rm734OFjCayTLYFMZMc5V5WyYT9Zlbh0eXRju6F98TjcTOcc1VetXYQ18V2cs0PQkdUVmCH27DAXbYnR553UZc+bSvwiIIZCVxGOxmPmZhNrJ7JGZH7OMxWZuFBu6erikn125cfYsR41d2hyYytMGoCZKG4iMKyq9haJMoCcJQ+/nbQoso9KSPeRyP4ob3vFkcYQyKJop8dST8EfSVvfrbJiabKGl21a5vV4ut85BcqiHypgu1h4N7UXrCFpo58Qo3jTMMdTaGATTIELcOgrDGYtFa1GlpYgJs/RpNcwrx2KgDYvEc2C3bpJJgAS5JIORrO93JO9h+ri5rfbKQ/fig+TBMmiY8Quq4ag2sjUBfXaQapEzAGcBuASTYBYV/0MQDcgwTWpmKFO+VEVKPd8sD1iqrZ4qk4AFLPPW32qPU6Nvrty5MN91/xh2czxrOrIk8TPZlkuU0TRVOwPDxG0T/n8bnrVCfjriUSBMuQdUI0+HU5wrRL1EPQ1H7XsFw5xKcbuTUkubUYZ5Ua02+LId83cuoOD0v8iWZ610tMYGPS4sJ6sxwP5cMDt96YNsJYdRC5OajFDGsoiZNIu5GcrVAeWx7K4eIlNowH+0cGVqoxBmC51lo+p7ZeKcuSZ51sQ8aJR+VHPSu+0nxeJs/Uo8uYEnF2DWF+xFcZitUNJaRzwz07y+IN6+t8llpifqoy72wAdzvXIwZwS+KXUnyYAo7tkMXCVu55tX7m9vH7/xdgANLR8bFRnerAAAAAAElFTkSuQmCC',
      viewWidth: "100%",
      viewLeft: "0px",
      viewTop: "0px",
      watingTextBitmapWidth: 90,
      watingTextBitmapHeight: 30,
      watingTextBitmapTop: "45%"
    },
    tabView: {
      activeColor: "#414794",
      normalColor: "#929292",
      subpages: ["index_message.html", "index_mine.html"],
      subpageStyle: {
        top: 0,
        bottom: 51
      }
    }
  }
}

export const webview = {
  /*
   * 打开原生view层
   * @param {Object} options open页面对象
   * options-url 打开的url
   * options-id 打开的id
   * options-titleNView title内容以及样式
   * options-extras 额外参数，必须为对象
   * @param {Function} showCB view显示回调函数
   * @param {Function} titleUpdateCB title更新回调函数
   * */
  openView: function (options, showCB, titleUpdateCB) {
    let nWaiting = plus.nativeObj.View.getViewById('nWaiting')
    console.log("open-nWaiting " + JSON.stringify(nWaiting))
    if (!nWaiting) { // 没有有通用wating过度层
      console.log('进入过渡层绘制')
      webview.drawWaiting(function () { // 绘制原生view页面切换过渡层
        webview.createContentWebview(options, showCB, titleUpdateCB)
      })
    } else {
      webview.createContentWebview(options, showCB, titleUpdateCB)
    }
  },
  /*
   * 创建原生过度页面内容
   * @param {Object} options open页面对象
   * @param {Function} showCB view显示回调函数
   * @param {Function} titleUpdateCB title更新回调函数
   * */
  createContentWebview: function (options, showCB, titleUpdateCB) {
    inputBlur() // 清除inputBlur
    let nWaiting = plus.nativeObj.View.getViewById('nWaiting')
    console.log('nWaiting ' + JSON.stringify(nWaiting))
    let contentWebview = null
    if (options.titleNView === false) {
      contentWebview = plus.webview.create(options.url, options.id, {
        subNViews: options.subNViews || ""
      }, options.extras)
    } else {
      let titleNView = options.titleNView || uConst.common.titleNView
      let autoBackButton = titleNView.autoBackButton === "undefined" ?
        uConst.common.titleNView.autoBackButton : titleNView.autoBackButton
      contentWebview = plus.webview.create(options.url, options.id, {
        titleNView: titleNView,
        subNViews: options.subNViews || ""
      }, options.extras)
    }
    contentWebview.addEventListener('close', function () {
      contentWebview = null
    })
    contentWebview.addEventListener('titleUpdate', function () {
      titleUpdateCB && titleUpdateCB()
    }, false)
    contentWebview.addEventListener('loaded', function () {
      contentWebview.removeEventListener('loaded')
      contentWebview.show('pop-in', null, function () {
        nWaiting && nWaiting.hide()
        showCB && showCB()
      }, {
        capture: nWaiting
      })
    }, false)
  },
  /*
   * 制作过渡层原生view
   * @param {Function} cb 打开原生view层后回调
   * */
  drawWaiting: function (cb) {
    let nWaiting = plus.nativeObj.View.getViewById('nWaiting')
    console.log("draw-nWaiting " + JSON.stringify(nWaiting))
    let contentBitmap = plus.nativeObj.Bitmap.getBitmapById('indexLoading')
    let topoffset = 0
    let bodyWidth = document.body.clientWidth
    let indexWaitingWidth = (Number(bodyWidth) - uConst.index.loadingView.watingTextBitmapWidth) / 2 + "px"
    console.log("contentBitmap " + JSON.stringify(contentBitmap))
    if (plus.navigator.isImmersedStatusbar()) { // 兼容沉浸式状态栏模式
      topoffset = Math.round(plus.navigator.getStatusbarHeight())
    }
    if (nWaiting) {
      return nWaiting
    }
    let bitmap = new plus.nativeObj.Bitmap('back')
    bitmap.loadBase64Data(uConst.common.loadingView.data, function () {
      console.log("bitmap制作成功 " + JSON.stringify(bitmap))
      let backBitmap = plus.nativeObj.Bitmap.getBitmapById('back')
      console.log("backBitmap " + JSON.stringify(backBitmap))
      nWaiting = new plus.nativeObj.View('nWaiting', {
        top: '0px',
        left: '0px',
        height: '100%',
        width: '100%',
        backgroundColor: '#222'
      })
      nWaiting.interceptTouchEvent(false)
      //初始化绘制nwaiting界面
      nWaiting.drawRect('#222', {
        top: '0px',
        left: '0px',
        height: (topoffset + 44) + 'px',
        width: '100%'
      }) //绘制title背景色
      nWaiting.drawBitmap(backBitmap, null, {
        top: topoffset + 'px',
        left: '0px',
        width: '44px',
        height: '44px'
      }, 'backicon')
      nWaiting.drawText('', {
        top: topoffset + 'px',
        left: '0px',
        width: '100%',
        height: '44px'
      }, {
        size: '17px',
        color: '#CCCCCC'
      })
      nWaiting.drawRect('#393939', {
        top: (topoffset + 44) + 'px',
        left: '0px',
        width: '100%'
      }) //绘制等待内容区背景色
      nWaiting.drawBitmap(contentBitmap, null, {
        top: "45%",
        left: indexWaitingWidth,
        width: '90px',
        height: '30px'
      }, 'indexWaiting1')
      cb() // nWaiting完成回掉
      return nWaiting
    }, function (e) {
      console.log('Back bitmap load failed: ' + JSON.stringify(e))
    })
  },
  /*
   * 获取首页原生loading层
   * */
  getIndexWaiting: function () {
    let topoffset = 0
    if (plus.navigator.isImmersedStatusbar()) { // 兼容沉浸式状态栏模式
      topoffset = Math.round(plus.navigator.getStatusbarHeight())
    }
    let indexWating = new plus.nativeObj.View('indexWating', {
      top: uConst.index.loadingView.viewTop,
      left: uConst.index.loadingView.viewLeft,
      width: uConst.index.loadingView.viewWidth
    })
    let bitmap = new plus.nativeObj.Bitmap('indexLoading')
    bitmap.loadBase64Data(uConst.index.loadingView.data, function () {
      bitmap.isLoadSuccess = true
      let bodyWidth = document.body.clientWidth
      let indexWaitingWidth = (Number(bodyWidth) - uConst.index.loadingView.watingTextBitmapWidth) / 2 + "px"
      indexWating.drawBitmap(bitmap, null, {
        top: uConst.index.loadingView.watingTextBitmapTop,
        left: indexWaitingWidth,
        width: uConst.index.loadingView.watingTextBitmapWidth + 'px',
        height: uConst.index.loadingView.watingTextBitmapHeight + "px"
      }, 'indexWaiting')
      console.log('Back bitmap load success')
    }, function (e) {
      console.log('Back bitmap load failed: ' + JSON.stringify(e))
    })
    indexWating.interceptTouchEvent(true)
    console.log("bitmap.isLoadSuccess " + bitmap.isLoadSuccess)
    return indexWating
  }
}
