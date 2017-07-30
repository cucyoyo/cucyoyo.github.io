new Vue({
	el: '#content',
	data: {
		productList: [],
		totalMoney: 0,
		selectallFlag: false,
		delFlag: false,
		curProduct: '',
		// message: 'hello yoyo',

	},
	filters: {
		formatPrice: function(value,after) {
			return '￥ '+ value.toFixed(2) + after;
		}
	},
	mounted: function() {
		this.$nextTick(function(){
			this.getData();
		})
	},
	
	methods: {
		getData: function() {
			var _this = this;
			this.$http.get("data/cart.json").then(function(res) {
				_this.productList = res.body.result.list;
				// _this.totalMoney = res.body.result.totalMoney
			});
		},
		changeCount: function(item, way) {
			if (way > 0) {
				item.count ++;
			}
			else{
				item.count --;
				if (item.count <= 1) {
					item.count = 1;
				}
			}
			this.caculTotalmoney();
		},
		caculTotalmoney: function() {
			var _this = this;
			this.totalMoney = 0;
			this.productList.forEach(function(item){
				if (item.checked) {
					_this.totalMoney += item.price * item.count;
				}
			});
		},
		select: function(item) {
			if (typeof item.checked == 'undefined') {
				this.$set(item,'checked',true);
			}
			else {
				item.checked = !item.checked;
			}
			this.caculTotalmoney();
		},
		selectAll: function(flag) {
			var _this = this;
			this.selectallFlag = !flag;
			console.log('this.selectallFlag' +this.selectallFlag);
			this.productList.forEach(function(item,index){
				if (typeof item.checked == 'undefined') {
					_this.$set(item,'checked',_this.selectallFlag);
				}
				else {
					item.checked = _this.selectallFlag;
				}
				
				
			});
			_this.caculTotalmoney();
			// console.log('selectallFlag'+ this.selectallFlag);
		},
		delConfirm: function(item) {
			this.curProduct = item;
			this.delFlag = true;
			console.log('delFlag'+this.delFlag);
		},
		delProduct: function() {
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
			this.delFlag = false;
		},

	},

})

Vue.filter('money', function(value) {
	return '￥ ' + value.toFixed(2);
})
