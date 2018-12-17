<template>
    <div class="demo-layout">
        <header>
            <nav class="navbar">
                <div class= "">
                    <h1>{{ title }}</h1>
                    <form class="form-inline">
                        <select 
                            v-model = "selectedWidgetId" 
                            class="form-control mr-sm-2">
                            <option 
                                v-for = "widget in widgets" 
                                :key = "widget.id" 
                                :value = "widget.id"
                            >
                                {{ widget.name }}
                            </option>
                        </select>
                    </form>
                </div>
            </nav>
        </header>
        <div 
            class="container" 
        >
            <div 
                class="row" 
            >
                    
                <div 
                    class="col-sm-12 main" 
                >
                    <div class="widget">
                        <component 
                            :is="selectedWidget" 
                        />
                    </div>
                        
                </div>
                    
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components : {
    },
    props : {
        title : {
            type : "string",
            default : "Update Title"
        },
        widgets : {
            type : "array",
            default : []
        }
    },
    data () {
        return {
            selectedWidgetId : this.widgets[0].id
        }
    },
    computed : {
        selectedWidget () {
            return this.selectedWidgetData.link;
        },
        selectedWidgetData () {
            this.selectedWidgetId
            let widget = null;
            for (let i = 0; i < this.widgets.length; i++) {
                
                if (this.widgets[i].id == this.selectedWidgetId) {
                    widget =  this.widgets[i];
                }
            }
            return widget;
        }
    },
    watch : {
        "selectedWidgetId" () {
            this.selectedWidgetId;
            this.selectedWidget;
        }
    }
}
</script>
<style lang="scss">
.demo-layout {
    font-size :16px;
    .widget {
        margin-left: 20px;
        margin-right: 20px;
    }
    .main-box {
        display: flex;
        flex-direction: column;
    }
    .flexdiv {
        flex-grow: 1;
    }
    .nav-panel {
        

        h2 {
            font-size:22px;
            text-align:center;
        }
        
    }

    .nav-item {
        cursor: pointer;
        display: block;
        font-weight:bold;
        &:hover {
            text-decoration: underline;
        }
        text-align:center;
        font-size: 21px;
    }

    .navbar {
        width:100%;
        background-color: #3393FF;
        color: white;
        font-weight:bold;
        font-size:25px;
        border-radius: 0px;
        padding-left:20px;
        padding-bottom:5px;
        padding-top:5px;
        display: flex;
        align-items: center;
        background: #1e5799; /* Old browsers */
        background: -moz-linear-gradient(top, #1e5799 0%, #2989d8 74%, #207cca 100%, #7db9e8 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top, #1e5799 0%,#2989d8 74%,#207cca 100%,#7db9e8 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, #1e5799 0%,#2989d8 74%,#207cca 100%,#7db9e8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#7db9e8',GradientType=0 ); /* IE6-9 */

        h1 {
            font-size:30px;
            display:inline-block;
            vertical-align: middle;
            margin:0px;
        }
        .form-inline {
            display:inline-block;
            margin-right:20px;
            vertical-align: middle;
            margin: 0px;
        }
    }
    .btn-lg {
        margin-top:5px;
        margin-bottom:5px;
        padding: 5px;
    }
}
</style>