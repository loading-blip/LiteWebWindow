<script>

</script>


<template>
<div id="StartMenu">
    <div id="StartMenuBar">
        <p>Start Bar</p>
    </div>
    <h1>User</h1>
    <div id="StartMenuList">
        <ul>
            <li>GenMenu</li>
            <li>TaskManager</li>
        </ul>
    </div>    
</div>
</template>


<style scoped lang="scss">
    $barWidth: 50px;
    $H1Height: 50px;
    $H1padding: 10px;
    $ListColor: #a7a7a7;
    $ListColorHover: #bfbfbf;

    #StartMenu{
        display: none;
        position: absolute;
        bottom: 50px;
        left: 0;
        width: 300px;
        height: 500px;
        box-shadow: 10px 10px 0px rgba(53, 53, 53, 0.3);
        z-index: 9998;
        h1 {
            color: white;
            background-color: #2ca0f8;
            padding: $H1padding;
            margin: 0;
            width: calc(100% - #{$barWidth});
            line-height: 50px;
            top: 0;
            text-align: center;
        }
        #StartMenuBar{
            background-color: rgb(112, 112, 112);
            height: 100%;
            width: $barWidth;
            position: relative;
            left: 0;
            p{
                transform: rotate(0.25turn) translate(60%, 75px);
                width: 200px;
                letter-spacing: 5px;
                font-weight: bold;
                margin: 0;
                color: white;
            }
        }
        #StartMenuList,h1{
            position: absolute;
            left: $barWidth;
        }
        #StartMenuList{
            top: calc($H1Height + $H1padding *2);
            width: calc(100% - $barWidth);
            height: calc(100% - $H1Height - $H1padding *2);
            background-color: $ListColor;
            ul {
                list-style-type: none;
                padding: 0;
                margin: 0;
                li {
                    padding: 10px;
                    margin: 0;
                    background-color: $ListColor;
                    color: white;
                    border-bottom: 1px solid white;
                    cursor: pointer;
                }
                li:hover {
                    background-color: $ListColorHover;
                }
            }
        }
    }

    
</style>
