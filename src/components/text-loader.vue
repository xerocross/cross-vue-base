<template>
    <div class = "text-loader">
        <form @submit.prevent = "">
            <div class="form-group">
                <div v-if = "!isFailure">
                    <div 
                        v-if = "!isLoading && !isTextLoaded" 
                        class="alert alert-warning">Nothing Loaded</div>
                    <div 
                        v-if = "!isLoading && isTextLoaded" 
                        class="alert alert-success">Loaded: {{ currentLoadedText }}</div>
                    <div 
                        v-if = "isLoading" 
                        class="alert alert-info loading"
                    >
                        {{ loadingText }}
                    </div>
                </div>
                <div v-if="isFailure">
                    <div 
                        class="alert alert-danger">Error</div>
                </div>
                <label>
                    Choose a File
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
            currentLoadedText : "",
            isLoading : false,
            loadingText : "loading",
            animationHandle : undefined,
            isFailure : false
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
    mounted () {
        this.animateLoading();
    },
    beforeDestroy () {
        clearInterval(this.animationHandle);
    },
    methods : {
        getText () {
            this.isTextLoaded = false;
            this.isLoading = true;
            let self = this;
            self.isFailure = false;
            self.$emit("event_loading");
            SimpleQajax.execute({
                URL : this.textURL,
                method : "GET"
            }).then(function(response){
                self.isTextLoaded = true;
                self.isLoading = false;
                self.rawText = response.responseText;
                self.currentLoadedText = self.getTextByKey(self.currentTextOption).name;
                self.$emit("event_text_loaded", self.rawText);
                self.$emit("event_title_loaded", self.currentLoadedText);
            }).fail(function(e) {
                self.$emit("event_error_loading_text");
                self.isFailure = true;
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
        },
        animateLoading () {
            let self = this;
            this.animationHandle = setInterval(function(){
                self.loadingText = "LOADING";
                setTimeout(function(){
                    self.loadingText = "loading";
                },500);

            },1000)
        }
    }
}
</script>
<style lang = "scss">
    .text-loader {
        .alert.alert-info, .alert.alert-warning, .alert.alert-success, .alert.alert-danger {
            padding-top: 0px;
            padding-bottom: 0px;
            font-weight: bold;
        }
    }
</style>