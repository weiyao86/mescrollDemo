<template>
    <div class="my-outbox">
        <div class="my-inbox" ref='box'>
            <div :class="setDir" v-for="(item,index) in sendVal" :key='index'>
                {{item.place}}<span class="my-uname">{{item.name}}</span>刚刚购买了产品
            </div>
            <div :class="setDir" v-for="(item,index) in sendVal" :key='(index+1)*100'>
                {{item.place}}<span class="my-uname">{{item.name}}</span>刚刚购买了产品
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'my-marquee-left',
        props:{        
            sendVal1:Array,
            direction:{
              type:String,
              default:'up1'
            },
            timer:{
              type:Number,
              default:1*1000
            }
        },
        data() {
            return {
              sendVal:this.sendVal1,

            }
        }, 
        computed:{
          setDir(){
            
              return this.direction == 'up' ? 'my-list up' : 'my-list';
          }
        },
        mounted:function(){
            var that = this;
            that.sendVal=[];
            for(let i=0;i<5;i++){
               that.sendVal.push({
                 place:'你好啊---'+i,
                 name:'某某人++++'+i
               })
            }
           that.$nextTick(()=> that.fn());
            
        },
        methods:{

        fn(){
          var me=this;
            var target = this.$refs.box; 
            var num = 0;
            var up=me.direction=='up';
            var middle=(up ? target.offsetHeight : target.offsetWidth)/2;
            var coord=up ? 'translateY' :'translateX';
            var cancelTime=null;
            

             let callRecursive=()=>{   
                num ++;
                
                if(num >= middle){
                    num = 0;
                }
                
                target.style =`transform: ${coord}(-${num}px)`;
                if(num%35 == 0){
                    clearTimeout(cancelTime);
                    cancelTime =setTimeout(()=>requestAnimationFrame(callRecursive),me.timer);
                }else{
                    requestAnimationFrame(callRecursive)
                } 
                }             
            callRecursive();
        }
      }
    }
</script>

<style lang="less" scoped>
    .my-outbox{
        color: #D7BC8D;
        overflow: hidden;
        height: 35px;
        background: #422b02;
        position: relative;
        .my-inbox{
            white-space: nowrap;
            position: absolute;
            font-size: 0;
            .my-list{
                margin-right: 25px;
                display: inline-block;
                font-size: 13px;
                height: 35px;
                line-height: 35px;
                .my-uname{
                    color: #FF8900;
                }
            }
            .up{
              width:100%;
              display:block;
            }
        }
    }
</style>