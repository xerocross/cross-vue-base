<template>
    <div class = "text-loader">
        <form @submit.prevent = "">
            <div class="form-group">
                <div class="alert alert-info">Loaded: {{ currentLoadedText }}</div>
                <label>
                    Choose a Study Set: {{ currentTextOption }}
                </label>
                <select 
                    v-model="currentTextOption" 
                    class="form-control">
                    <option 
                        v-for = "opt in textOptions" 
                        :key = "opt.url"
                        :value = "opt.url"
                    >
                        {{ opt.name }}
                    </option>
                </select>
                <button 
                    class="btn btn-primary btn-lg" 
                    @click = "getText">
                    load
                </button>
            </div>
        </form>
    </div>
</template>
<script>
import SimpleQajax from "../helpers/simple-qajax.js";

export default {
    props : {
        logThis : {
            type : "function",
            default : function() {
            }
        },
        textOptions : {
            type : "array",
            default : []
        },
        currentTextOption : {
            type : "string",
            default : ""
        },
        baseUrl : {
            type : "string",
            default : ""
        }
    },
    data () {
        return {
            isTextLoaded : false,
            status : undefined,
            rawText : "",
            currentLoadedText : ""
        }
    },
    computed : {
        textURL () {
            return this.baseUrl + this.currentTextOption;
        },
        loadStatus () {
            return this.isTextLoaded ? this.currentLoadedText : ""
        }
    },
    watch : {
    },
    methods : {
        getText () {
            this.isTextLoaded = false;
            let self = this;
            self.$emit("event_loading");
            SimpleQajax.execute({
                URL : this.textURL,
                method : "GET"
            }).then(function(response){
                self.isTextLoaded = true;
                self.rawText = response.responseText;
                self.currentLoadedText = self.getTextByKey(self.currentTextOption).name;
                self.$emit("event_text_loaded", self.rawText);
            }).fail(function(e) {
                self.$emit("event_error_loading_text");
                alert("Sorry: There was a problem loading the text.");
            });

        },
        getTextByKey (key) {
            for(let i = 0; i < this.textOptions.length; i++) {
                if (this.textOptions[i].url == key) {
                    return this.textOptions[i];
                }
            }
            return null;
        }
    }
}
</script>
<style lang = "scss">
    .text-loader {
        .alert.alert-info {
            padding-top: 0px;
            padding-bottom: 0px;
            font-weight: bold;
        }
    }
</style>