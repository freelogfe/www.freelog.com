var routeMap = {
  "1" : "/pages/user/index.html",
  "3" : "/pages/favorites.html",
  "4" : "/pages/userResource.html",
  "5" : "/pages/account.html",
};
export default {
    name: 'user-nav-bar',
    data(){
        return {

        }
    },
    props:['index'],
    computed : {
      activeIndex: function () {
        if(this.index) {
          return this.index
        }
        return  '1'
      }
    },
    mounted(){
    },
    methods: {
      handleSelect(index)  {
        window.location.assign(routeMap[index]);
      }
    }
}
