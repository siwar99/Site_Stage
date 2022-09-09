function generateTableLines(mtc) {
    console.log("generateTableLines, mtc set to: " + mtc)
    if (mtc ==  null) {
	console.error("User mtc is void!")
	return;
    }

    var generatedGridData = [];
    Vue.set(demo.gridData, [])
    var mtc_criterias_json = criteria_list;
    const the_mtcs = mtc.split('/');
    var objects = []
    if (mtc.includes('XHN')) {
	objects = mtc_criterias_json.objects['XHN']
    } else if (mtc.includes('XCB')) {
	objects = mtc_criterias_json.objects['XCB']
    }

    // construct criteria list
    // we need to parse the array of criteria objects, and select the criteria one that matches MTC
    // go through each MTC
    var i;
    for (i = 0; i < the_mtcs.length; i++) {
	var m = the_mtcs[i];
	if (m != null) {
	    var j;
	    for (j = 0; j < objects.length; j++) {
		var o = objects[j]
		var k;
		for (k = 0; k < o.criterias.length; k++) {
		    var c = o.criterias[k];
		    // check if codes match
		    if (c.mne == m) {
			c.select = true;
			break;
		    }
		}
	    }
	}
    }

    // perform check and make data ready for table displaying
    for (j = 0; j < objects.length; j++) {
	var o = objects[j];
	var select = false;
	var k;
	for (k = 0; k < o.criterias.length; k++) {
	    var c = o.criterias[k]
	    if ((c.select != null) && (c.select == true) && (select == true)) {
		console.error("ERROR in MTC: two criterias chosen for object: " + o.label);
	    }
	}
	var myLine = {};
	myLine.criteria = o.label;
	myLine.value = "";
	myLine.code = "";
	var k;
	for (k = 0; k < o.criterias.length; k++) {
	    var c = o.criterias[k];
	    if ((c.select != null) && (c.select == true)) {
		myLine.value = c.label;
		myLine.code = c.mne;
		delete c.select
		break;
	    }
	}
	generatedGridData.push(myLine)
	demo.$set(demo.gridData, j, myLine)
    }
}

// register the grid component
Vue.component('dropdown', {
    template: "#dropdown-template",
    data: function() {
	return {
	    showMenu: false
	}
    },
    props: {
	onClick: 'function',
	items: {
	    type: 'Object',
	    default: []
	}
    },
    methods: {
	toggleShow: function() {
	    this.showMenu = !this.showMenu;
	},
	itemClicked: function(item) {
	    this.toggleShow();
	    this.onClick(item);
	}
    }
})

// register the grid component
Vue.component("demo-grid", {
    template: "#grid-template",
    props: {
	heroes: Array,
	columns: Array,
	filterKey: String
    },
    data: function() {
	var sortOrders = {};
	this.columns.forEach(function(key) {
	    sortOrders[key] = 1;
	});
	return {
	    sortKey: "",
	    sortOrders: sortOrders
	};
    },
    computed: {
	filteredHeroes: function() {
	    var sortKey = this.sortKey;
	    var filterKey = this.filterKey && this.filterKey.toLowerCase();
	    var order = this.sortOrders[sortKey] || 1;
	    var heroes = this.heroes;
	    if (filterKey) {
		heroes = heroes.filter(function(row) {
		    return Object.keys(row).some(function(key) {
			return (
			    String(row[key])
				.toLowerCase()
				.indexOf(filterKey) > -1
			);
		    });
		});
	    }
	    if (sortKey) {
		heroes = heroes.slice().sort(function(a, b) {
		    a = a[sortKey];
		    b = b[sortKey];
		    return (a === b ? 0 : a > b ? 1 : -1) * order;
		});
	    }
	    return heroes;
	}
    },
    filters: {
	capitalize: function(str) {
	    return str.charAt(0).toUpperCase() + str.slice(1);
	}
    },
    methods: {
	sortBy: function(key) {
	    this.sortKey = key;
	    this.sortOrders[key] = this.sortOrders[key] * -1;
	}
    }
});

// bootstrap the demo
var demo = new Vue({
    el: "#demo",
    data: {
	searchQuery: "",
	message: "",
	gridColumns: ["criteria", "value", "code"],
	gridData: []
    }
});

var mtc_raw = new Vue({
    el: '#mtc-raw-form',
    data: {
	raw_mtc:""
    }
});

var mtc_submit = new Vue({
    el: '#mtc-submit'
});

var mtc_mode = new Vue({
  el: ".mymtcinputradios",
  data() {
    return {
      selected: "conf"
    };
  },
    methods: {
	changeMtcMode: function() {
	    if (this.selected == "conf") {
		document.getElementById("mtc-raw-input").style.display = "none"
		document.getElementById("mtc_vc_conf").style.display = "block"
	    } else {
		document.getElementById("mtc-raw-input").style.display = "block"
		document.getElementById("mtc_vc_conf").style.display = "none"
	    }
	}
    }
});

var vehicle_mode = new Vue({
  el: ".myvehicletyperadios",
    data: {
	selected: "XHN"
    }
});

var milestone = new Vue({
  el: ".mymilestoneradios",
    data: {
	selected: "PT"
    }
});


const vc_dropdown = new Vue({
    el: '#mtc_dropdown',
    data: {
	activeConf:null,
	confs: Array()
    },
    created()
    {
	this.generateList()
    },
	
    methods: {

		
	changeConf: function(conf) {
	    this.activeConf = conf;

	    for (const m of mtcs) {
		if (m.milestone == milestone.selected) {
		    for (v of m.vehicles) {
			if (v.name == vehicle_mode.selected) {
			    for (c of v.configs) {
				if (conf == c.name) {
				    console.debug("Foud conf with mtc:" + c.mtc)
				    generateTableLines(c.mtc)
				    return
				}
			    }
			}
		    }
		}
	    }
	},
	generateList: function() {
	    this.confs = Array()
	    for (const m of mtcs) {
		if (m.milestone == milestone.selected) {
		    for (v of m.vehicles) {
			if (v.name == vehicle_mode.selected) {
			    for (c of v.configs) {
				this.confs.push(c.name)
			    }
			    return
			}
		    }
		}
	    }
	}
    }
});
