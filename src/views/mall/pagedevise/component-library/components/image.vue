<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
    <div class="imageComponent" :style="{marginBottom: `${setData.pageSpacing}px`}">
        <div v-if="!IsEmptyObj(setData)&&setData.imageUrl" class="imgBlock" ref="imageEle">
            <el-image :src="setData.imageUrl" style="width: 100%;" :style="{ height: `${setData.height}px` }">
                <div slot="placeholder" class="image-slot">
                    加载中 <span class="dot">...</span>
                </div>
            </el-image>
        </div>
        <placeholderImg v-else></placeholderImg>
        <!-- noEditor -->
       <div v-if="noEditor" class="noEditor"></div>
    </div>
</template>

<script>
import { mapState , mapGetters , mapMutations , mapActions } from 'vuex';
import placeholderImg from "../pages/page-components/placeholderImg";

export default {
    data() {
        return {};
    },
    components: { placeholderImg },
    props: {
        theme : { type: Object | Array },
        setData : { type: Object | Array },
        cId     : { type: Number },
        noEditor: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        ...mapState({
            componentsList: state => state.divpage.componentsList,
        })
    },
    created() {},
    mounted() {},
    methods: {
        ...mapMutations([
            'updateData'
        ]),
    },
    watch:{
        componentsList(newVal, oldVal){          //添加的时候触发（解决没有移动的时候不emit数据）
            let that = this;
            that.updateData({componentsList: that.componentsList})
        }
    }
};
</script>
<style lang='less' scoped>
.imageComponent{
    position: relative;
    .imgBlock{
        text-align: center;
        .el-image{
            display: block;
            width: 100%;
            .el-image__error{
                line-height: 120px;
            }
        }
    }
    .eagleMapContainer {
        position: absolute;
        z-index: 200;
        overflow: hidden;
        visibility: visible;
        background: #f1f1f1;
        opacity: .6;
        cursor: move;
        #tz {
            position: absolute;
            right: 1px;
            bottom: 1px;
            width: 28px;
            height: 28px;
            cursor: se-resize;
            /*z-index: 200001;*/
            // background-image: url("");
            #move_tz {
                position: absolute;
                right: 0px;
                bottom: 0px;
                width: 27px;
                height: 27px;
                cursor: se-resize;
                z-index: 100;
                // background-image: url("");
                background: #cccccc;
                background-position: 0px 0px;
                &:hover{
                    background: #696969;
                }
            }
        }
    }
    .noEditor{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0);
        z-index: 201;
    }
}
</style>
