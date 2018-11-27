<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="类别列表"></van-nav-bar>
        </div>
        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                       <ul>
                           <li v-for="(item,index) in category" :key="index" @click="clickCategory(index,item.ID)" :class="{categoryActive:categoryIndex==index}">
                               {{item.MALL_CATEGORY_NAME}}
                           </li>
                       </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tabCategorySub">
                        <van-tabs v-model="active" @click="onClickCategorySub">
                            <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
                            </van-tab>
                        </van-tabs>
                    </div>
                    <!-- 下拉刷新和上拉加载 -->
                    <div id="list-div">
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                        <van-list
                            v-model="loading"
                            :finished="finished"
                            @load="onLoad"
                            >
                            <div class="list-item" v-for="(item,index) in goodList " :key="index">
                                <div class="list-item-img"><img :src="item.IMAGE1"  width="100%" :onerror="errorImg"></div>
                                <div class="list-item-text">
                                    <div>{{item.NAME}}</div>
                                    <div class="">￥{{item.ORI_PRICE | moneyFilter}}</div>
                                </div>
                            </div>
                        </van-list>
                        </van-pull-refresh>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import {Toast} from 'vant'
import {toMoney} from '@/filter/moneyFilter.js'
export default {
    data(){
        return{
            category:[],
            categoryIndex:0, //点击改变样式的点
            categorySub:[],
            active:0,
            list:[],
            loading:false,   //上拉加载使用
            finished:false,  //下拉加载是否没有数据了
            isRefresh:false, //下拉加载
            page:1,          //商品列表的页数
            goodList:[],     //商品信息
            categorySubId:'',//商品子分类ID
            errorImg:'this.src="' + require('@/assets/images/errorimg.png') + '"'   ,  //错误图片显示路径

        }
    },
    filters:{
        moneyFilter(money){
            return toMoney(money)
        }  
    },
    mounted(){
        let winHeight = document.documentElement.clientHeight
        document.getElementById("leftNav").style.height= winHeight-46 +'px'
        document.getElementById('list-div').style.height=winHeight-90 +'px'
        document.getElementById('list-div').style.height=winHeight-90-50 +'px'
    },
    //监听方法
    created(){
        this.getCategory()
    },
    methods:{
        //左边大类
        getCategory(){
            axios({
                url:url.getCateGoryList,
                method:'get',
            })
            .then(response=>{
                console.log(response)
                if(response.data.code == 200 && response.data.message ){
                    this.category=response.data.message
                    this.getCategorySubByCategoryID(this.category[0].ID)
                }else{
                    Toast('服务器错误，数据取得失败')
                    }
            })
            .catch(error=>{
                console.log(error)
            })
        },
        //点击左边每个li，m每个li都有id，通过id找到右边的小类
        clickCategory(index,categoryId){
            this.categoryIndex=index
            this.getCategorySubByCategoryID(categoryId)
            this.page=1
            this.finished = false
            this.goodList=[]
        },
        //根据大类ID读取小类类别列表
        getCategorySubByCategoryID(categoryId){
            axios({
                url:url.getCateGorySubList,
                method:'post',
                data:{categoryId:categoryId}
            })
            .then(response=>{
                if(response.data.code == 200 && response.data.message ){
                    this.categorySub=response.data.message
                    this.active = 0
                }else{
                    Toast('服务器错误，数据取得失败')
                }  
            })
            .catch(error=>{
                console.log(error)
            }) 
        },
        //上拉
        onLoad(){
            setTimeout(()=>{
               this.categorySubId = this.categorySubId?this.categorySubId:this.categorySub[0].ID //不点击默认id
                this.getGoodList() //获取小类商品详情的数据
            },1000)
        },
        //下拉
        onRefresh(){
            setTimeout(() => {
                this.isRefresh = false;
                this.finished = false;
                this.goodList=[];
                this.page=1
                this.onLoad()
            }, 500);
        },
        //右边小类的详细商品
        getGoodList(){
            axios({
                url:url.getGoodsListByCategorySubID,
                method:'post',
                data:{
                    categorySubId:this.categorySubId,
                    page:this.page
                }
            })
            .then(response=>{
                console.log(response)
                if(response.data.code == 200 && response.data.message.length ){
                    this.page++
                    this.goodList=this.goodList.concat(response.data.message)
                }else{
                        this.finished = true;
                }
                this.loading=false;
                console.log(this.finished)
            })
            .catch(error=>{
                console.log(error)
            })
        },
        //点击小类获取i小类id
        onClickCategorySub(index,title){
            this.categorySubId = this.categorySub[index].ID
            console.log(this.categorySubId)

            this.goodList=[]
            this.finished = false
            this.page=1
            //加载下拉事件
            this.onLoad()

        }
    }
}
</script>

<style>
#leftNav ul li {
    line-height: 2rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
}
.categoryActive{
    background-color: red;
}
.list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
</style>
