<template>
    <Layout :style="{margin: '0 200px'}">
        <Content :style="{padding: '0 16px 16px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                <Row>
                    <Col span="8">
                        <Slider :style="{margin:'30px 0 0 0'}" v-model="thumbScale" :min="50" :step="5" show-tip="never"></Slider>
                    </Col>
                    <Col span="8">&nbsp;</Col>
                    <Col span="8">
                        <AutoComplete
                            v-model="query.value"
                            @on-search="handleSearch"
                            @on-select="handleSelect"
                            @keyup.enter.native="handleEnter"
                            placeholder="Search"
                            icon="ios-search"
                            style="width:200px">
                            <Option v-for="item in query.data" :value="item" :key="item">{{ item }}</Option>
                        </AutoComplete>
                    </Col>
                </Row>
            </Header>
            <div>
                <Button class="tag" type="ghost" shape="circle" size="small" @click="removeAllTags"><Icon type="trash-a"></Icon></Button>
                <Tag v-for="item in tags" :value="item" :key="item" 
                class="tag" type="border" :name="item"
                closable @on-close="removeTag">{{ item }}</Tag>
            </div>
            <Card dis-hover>
                <div>
                <waterfall
                    :line="line"
                    :line-gap="100 + 60 * thumbPercent"
                    :min-line-gap="100 + 50 * thumbPercent"
                    :max-line-gap="100 + 80 * thumbPercent"
                    :watch="items"
                    :align="'center'"
                    @reflowed="reflowed"
                    ref="waterfall">
                    <!-- each component is wrapped by a waterfall slot -->
                    <waterfall-slot
                        v-for="(item, index) in items"
                        :width="item.width * thumbScale"
                        :height="item.height * thumbScale"
                        :order="index"
                        :key="item.index"
                        move-class="item-move">
                        <div class="item" :index="item.index">
                            <img :src="item.url" :width="thumbPercent * 100 + '%'" :height="thumbPercent * 100 + '%'">
                        </div>
                    </waterfall-slot>
                </waterfall>
                </div>
            </Card>
        </Content>
        <Sider :style="{position: 'fixed', height: '100vh', right: 0, overflow: 'auto'}">
            Sider
        </Sider>
    </Layout>
</template>
<script>
import { Waterfall, WaterfallSlot } from 'vue-waterfall'

var ItemFactory = (function () {
    var lastIndex = 0
    function generateRandomItems(count) {
        var items = [], i
        for (i = 0; i < count; i++) {
            let w = 150
            let h = 100 + ~~(Math.random() * 50)
            let url = 'http://placehold.it/' + w + 'x' + h
            items[i] = {
                index: lastIndex++,
                width: w,
                height: h,
                url: url
            }
        }
        return items
    }
    return {
        get: generateRandomItems
    }
})()

export default {
    components: {
        Waterfall,
        WaterfallSlot
    },
    data() {
        return {
            line: 'v',
            items: ItemFactory.get(100),
            isBusy: false,
            query: {
                value: '',
                data: []
            },
            tags: [],
            thumbScale: 100
        }
    },
    computed:{
        thumbPercent:function(){
            return this.thumbScale * 0.01
        }
    },
    mounted() {
        let that = this
        //add items when scroll to bottom
        window.onscroll = function () {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            if (scrollTop + window.innerHeight >= document.body.clientHeight) {
                that.addItems()
            }
        }
    },
    watch: {
        tags: function (val, oldVal) {
            console.log('new tags:', val)
        }
    },
    methods: {
        addItems: function () {
            if (!this.isBusy && this.items.length < 500) {
                this.isBusy = true
                this.items.push.apply(this.items, ItemFactory.get(50))
            }
        },
        reflowed: function () {
            this.isBusy = false
        },
        handleSearch: function (value) {
            this.query.data = !value || value.indexOf('@') >= 0 ? [] : [
                value + '@qq.com',
                value + '@sina.com',
                value + '@163.com'
            ];
        },
        handleSelect: function (value) {
            this.addTag(value)
        },
        handleEnter: function (event) {
            this.addTag(this.query.value)
        },
        addTag: function (value) {
            let exist = false
            for (let i = 0; i < this.tags.length; i++) {
                if (value === this.tags[i]) {
                    exist = true
                    break
                }
            }
            if (!exist) this.tags.push(value)
            this.query.value = ''
        },
        removeTag: function (event, name) {
            for (let i = 0; i < this.tags.length; i++) {
                if (name === this.tags[i]) {
                    this.tags.splice(i, 1)
                    break
                }
            }
        },
        removeAllTags: function () {
            this.tags = []
        }
    }
}
</script>
<style scoped>
.item {
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
}
.wf-transition {
  transition: opacity 0.3s ease;
  -webkit-transition: opacity 0.3s ease;
}
.wf-enter {
  opacity: 0;
}
.tag {
  margin: 10px 5px 5px 0;
}
</style>
