<template>
    <div id="settings">
        <div class="form-group">
            <label class="form-label" for="input-example-1">Input Device</label>
            <select class="form-input" type="text" id="input-example-1" placeholder="Name">
                <option>Built-in Microphone</option>
                <option>AT2020+ USB</option>
            </select>
        </div>
        <div class="form-group">
            <label class="form-label" for="input-example-1">Output Device</label>
            <select class="form-input" type="text" id="input-example-1" placeholder="Name">
                <option>Built-in Microphone</option>
                <option>AT2020+ USB</option>
            </select>
        </div>
        <br>
        <button class="btn btn-lg btn-success" id="dc">Connect</button>
        <!--
        <button class="btn btn-lg btn-error" id="dc" disabled>Disconnect</button>
        -->
    </div>
</template>
<style>
    #settings {
        width: 75%;
        margin-top: 0.7rem;
        margin-left: calc(12.5%);
        text-align: left;
    }
    #settings .btn-group {
        width: 100%;
    }
    #settings select {
        width: 100%;
    }
    #dc {
        width: 100%;
    }
</style>