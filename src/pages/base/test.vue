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
    <div class="split-line">我要做第一种分隔线</div>
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
<script>

    import tree from "@/components/tree"
    export default {
        name: "test",
        asyncData({store,route}){
            // debugger;
            console.log(route)
            // store.dispatch('changeTest',{
            //   title:'来测试一波'
            // });
            // alert(store.state.title)
            return new Promise((resolve,reject)=>{

            setTimeout(()=>{resolve('i am!!! ');console.log('i am coming...');},200);
            });
        },
        components: {
            tree
        },
        data() {
            return {
                childList: {}, //子选项列表
                parentList: {}, //父级全选列表
                Products: [{
                    id: 0,
                    name: "test1",
                    children: [{
                        id: 3,
                        name: "test5555555555553"
                    }, {
                        id: 4,
                        name: "test4"
                    }, {
                        id: 5,
                        name: "test5",
                        children: [{
                            id: 31,
                            name: "test3131",
                            children: [{
                                id: 32,
                                name: "test.vue"
                             }]
                        }, {
                            id: 41,
                            name: "test41414141"
                        }, {
                            id: 51,
                            name: "test515151",
                        }]
                    }]
                },
                {
                    id: 1,
                    name: "test2",
                    children: [{
                        id: 6,
                        name: "test6"
                    }, {
                        id: 7,
                        name: "test7"
                    }, {
                        id: 8,
                        name: "test8"
                    }]
                },
                {
                    id: 2,
                    name: "test3",
                    children: [{
                        id: 9,
                        name: "test9"
                    }, {
                        id: 10,
                        name: "test10"
                    }, {
                        id: 11,
                        name: "test11"
                    }]
                }]
            };
        },
        created() {
            let me = this;

            // let recursive = (item) => {
            //     item.forEach(inner => {
            //         inner['checked'] = false;
            //         if (inner.children && inner.children.length) {
            //             recursive(inner.children);
            //         }
            //     })
            // }
            // recursive(me.Products);
        },
        methods: {
            //*********************控制全选start****************//

            getParent(i) { //获取父级数组
                let t = this;
                let list = t.Products.filter(item => {
                    return item.value.indexOf(i) > -1;
                });
                return list[0];
            },
            itemcheck(p, index) { //点击子checkbox
                let t = this;
                setTimeout(() => {
                    //change事件会在dom的value值返回之前触发，所以用setTimeout等待值返回后，再处理数组
                    let ischeck = t.childList.filter((items, i) => {
                        return items == p;
                    }).length;
                    if (ischeck > 0) {
                        //控制子项全选后，父级全选框要选中
                        // const checkArrSame = (arr1, arr2) => {
                        //   return arr1.length == arr2.length && arr1.every(item=>arr2.some(a2=>item.id==a2.id));
                        // }
                        // let temp=[];
                        // t.Products[index].forEach(item=>{t.childList.filter(c=>c.id==item.id)});
                        t.parentList = []
                    } else {
                        //控制取消子项选择后，父级的全选框要取消选中
                        let idx = t.parentList.indexOf(index);
                        if (idx > -1) {
                            t.parentList.splice(idx, 1);
                        }
                    }
                    console.log(t.parentList);
                });
            },
            changeAllChecked(idx) { //点击全选按钮，子集全选和，点击取消全选按钮，子集取消全选
                let me = this;

                let p = me.parentList[idx];

                if (p.checked) {
                    let c = me.childList[idx];
                    if (c == undefined) {
                        debugger;
                        me.$set(me.childList, idx, [0, 2]);

                        // me.childList[idx].concat([0,2,3])
                        console.log(me.childList)
                        // me.childList[idx]=p.items;
                    } else {
                        p.items.forEach((item, i) => {
                            if (c.indexOf(item) < 0) {
                                c.push(item);
                            }
                        });

                    }

                } else {
                    me.childList[idx] = [];
                    me.parentList[idx].checked = false;
                }
            }
            //*********************控制全选end****************//
        }
    };
</script>

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