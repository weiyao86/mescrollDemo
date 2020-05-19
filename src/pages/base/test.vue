<template>
    <div>
    <!-- <div v-for="(items,index) in Products" :key="index">
        <input type="checkbox"  :value="items.checked" v-model="items.checked" >
        <label>{{items.name}}</label>
        <div class="item" v-for="(item,i) in items" :key="i">
            <input type="checkbox" :value="item.checked" v-model="item.checked"/>
             <label>{{item}}</label>
        </div>
    </div> -->

    {{$store.state.title}}===========>
    <div class="split-line" v-globalDi="id">我要做第一种分隔线</div>
    <div class="split-line2"><span>
        我要做第二种分隔线
    </span></div>
    <ul>
        <tree v-for="(item,idx) in Products" :root="item" :depth=0 :key="idx">
            <template v-slot='slotProps'>
              <!-- 我是第{{slotProps.list.name+'======='+slotProps.list.level}}级 -->
            </template>
         
        </tree>
    </ul>
    </div>
</template>


<script src="./test.js"></script>

<style type="text/css" lang="less">
    .split-line2{
        position: relative;
        text-align: center;
        line-height: 30px;
        width:80%;
        margin:0 auto;  
        span{
            background: #fff;
            z-index: 3;
            position:relative;
            padding:0 30px;
        }
        &:before{
            position:absolute;
            content:' ';
            top:50%;
            left:0;
            height:1px;
            width:50%;
            background: #f00;
        }
         &:after{
            position:absolute;
            content:' ';
            top:50%;
            right:0;
            height:1px;
            width:50%;
            background: #f00;
        }
    }
     .split-line{
           display: flex;
            line-height:32px;
            border:1px solid #e9e9e9;
            width:80%;
            margin:0 auto;
            align-items: center;
        }
        .split-line::before,.split-line::after{
            content: ' ';
            flex:1;
            height:1px;
            background: #f00;
           
        }
        .split-line::after{
             margin-left:30px;
        }
        .split-line::before{
            margin-right:30px;
        }
    .item{
        padding-left: 40px;
    }
</style>