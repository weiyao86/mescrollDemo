<template>
    <li :style="{paddingLeft:list.level*15+'px'}">
        
        <slot :list="list">
            <input :id="'tree_'+list.id" type="checkbox" :value="list.checked" v-model="list.checked" @change="change(list)">
            <label :for="'tree_'+list.id">{{list.name}}----------{{depth}}</label>
       </slot>
        <ul v-if="list.children && list.children.length">
            <tree v-for="(inner,idx) in list.children" :root="inner" :depth="depth+1" :key="idx">
                <!-- 外部调用插槽中转 -->
                <template v-slot="slotProps">
                    <slot :list="slotProps.list"></slot>
                </template>
            </tree>
        </ul>
    </li>
</template>
<script>
    let c=0;
    export default{
        name:'tree',
        props:{
            root:{type:Object},
            depth:Number
        },
        data(){ 
            return {
                count:1,
                list:this.initData(this.root)
            }
        },

        methods:{
            initData(item){
                let me=this;
                me.$set(item,'checked',false);
                me.$set(item,'level',me.depth);
                if(item.children && item.children.length){
                    item.children.forEach(child=>{
                        me.initData(child);
                    })
                }
                return item;
            },
            change(item){
                let me=this;
                if(item.children && item.children.length){
                    item.children.forEach(function(child){
                        child.checked=item.checked;
                        me.change(child);
                    });
                }
            }
        }
    }
</script>
<style></style>