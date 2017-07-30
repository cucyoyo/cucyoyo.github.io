new Vue ({
	el: '#address-content',
	data: {
		addressList: [],
		seen: true,
		currentIndex: 0,
		deliverWay: 1,
		limit: 3,
		moreFlag: false,
		delFlag: false,
		currentAdd: '',
	},
	
	mounted: function() {
		this.$nextTick(function(){
			this.getData();
		})
	},
	computed: {
		addressFilter: function() {
			return this.addressList.slice(0,this.limit);
		}
	},
	methods: {
		getData: function() {
			this.$http.get('data/address.json').then(function(res) {
				this.addressList = res.body.result;
			});
		},
		clickMore: function() {
			this.moreFlag = !this.moreFlag;
			if(!this.moreFlag) {
				this.limit = 3;
			}
			else {
				this.limit = this.addressList.length;
			}
		},
		setDefault: function(addressId) {
			this.addressList.forEach(function(item,index) {
 				
				if (item.addressId == addressId) {
					item.isDefault = true;
				}
				else {
					item.isDefault = false;
				}
			})
		},
		delAddress: function() {
			var index = this.addressList.indexOf(this.currentAdd);
			this.addressList.splice(index,1);
			this.delFlag = false;

		}

	},
})