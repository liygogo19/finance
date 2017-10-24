<template>
    <f7-page>
        <form id="my-form" class="list-block">
            <ul>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">Name</div>
                            <div class="item-input">
                                <input type="text" name="name" placeholder="Your name">
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </form>

        <div class="content-block">
            <a href="#" class="button form-to-json">Get Form Data</a>
        </div>
    </f7-page>
</template>

<script>
    export default {
        methods:{
        },
        mounted(){
            var myApp = new Framework7();

            var $$ = Dom7;

            $$('.form-to-json').on('click', function(){
                var formData = myApp.formToJSON('#my-form');
                alert(JSON.stringify(formData));
            });
        }
    }
</script>