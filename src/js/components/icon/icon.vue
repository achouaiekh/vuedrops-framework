<template>
    <i :class="classes">
        <slot></slot>
    </i>

</template>


<script>
    export default {
        name: "vd-icon",
        props: {
            md: Boolean,
            mdi: Boolean,
            fa: Boolean,
        },

        data(){
            return {
                classes: []
            }
        },


        methods: {
            getClasses(){

                let classes = ["vd-icon"]

                const
                    vendors = {
                        fa: "fa",
                        md: "material-icons",
                        mdi: "mdi"
                    },
                    vendor = this.mdi ? vendors.mdi : this.md ? vendors.md : vendors.fa

                classes.push(vendor)

                let icon =  this.$slots.default.pop().text.trim().replace(/\s+|\-/g, '_')

                this.$el.innerHTML = this.md ? icon : ""

                if(!this.md) classes.push( vendor.concat('-', icon.replace("_", "-")))

                return classes

            }
        },

        mounted(){
            this.classes = this.getClasses()
        }
    }
</script>