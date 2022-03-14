
console.log("inside dashboard-vue.js")
const app =  Vue.createApp({
    // data() {
    //     return {
    //         indicatorData: {},
    //         statPercent: 0.0,
    //         statStartYear: 0,
    //         statEndYear: 0,
    //     }
    // },
    // mounted() {

    //     this.indicatorData = getData('mhi', 'years')
    //     spokaneData = this.indicatorData['Spokane']
    //     statEndData = spokaneData[spokaneData.length - 1]
    //     statStartData = spokaneData[spokaneData.length - 2]
    //     this.statPercent = (((statEndData - statStartData) / statStartData) * 100).toFixed(1)
    //     this.statEndYear = this.indicatorData['years'][spokaneData.length - 1]
    //     this.statStartYear = this.indicatorData['years'][spokaneData.length - 2]
    // }
}).mount("#app")