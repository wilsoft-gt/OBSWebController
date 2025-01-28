import OBSWebSocket from "obs-websocket-js";
import { obsStore } from "../store/connectStore";
import { scenesStore } from "../store/scenesStore";
import { scenePreviewStore } from "../store/scenePreviewStore";
import { alertStore } from "../store/alertStore";
import { recordingStore } from "../store/recordingStore";
import { streamStore } from "../store/streamStore";

class ObsHandler {
  constructor() {
    if (!ObsHandler.instance) {
      this.instance = this
    
      this.obs = new OBSWebSocket()
      this.scenePreviewInterval = undefined
      this.recordingInterval = undefined
      this.streamingInterval = undefined

      //Connection state
      this.storeConnected = obsStore(store => store.connect)
      this.storeDisconnected = obsStore(store => store.disconnect)

      //scene states
      this.setScenes = scenesStore(store => store.setScenes)
      this.scenesError = scenesStore(store => store.scenesError)
      
      //scene preview state
      this.setScenePreview = scenePreviewStore(store => store.setScenePreview)
      this.scenePreviewError = scenePreviewStore(store => store.scenePreviewError)

      //alert state
      this.displayAlert = alertStore(store => store.displayAlert)
      
      //recording state
      this.setRecordingStatus = recordingStore(store => store.setRecordingStatus)
      this.recordingError = recordingStore(store => store.recordingError)
      this.recordingStop = recordingStore(store => store.recordingStop)

      //streaming state
      this.setStreamStatus = streamStore(store => store.setStreamStatus)
      this.streamError = streamStore(store => store.streamError)
    }
    return ObsHandler.instance
  }
  
  async connect(wsUrl) {
    try {
      let result = await this.obs.connect(wsUrl)
      if (result) {
        this.handleEvents()
        this.fetchScenes(this.obs)
        this.fetchScenePreview(this.obs)
      }
    } catch (e) {
      this.displayAlert({title:e.error, description:JSON.stringify(e), icon:'error'})
    }
  }

  async disconnect() {
    try {
      await this.obs.disconnect()
      this.storeDisconnected()
      clearInterval(this.recordingInterval)
      clearInterval(this.streamingInterval)
      clearInterval(this.scenePreviewInterval)
    } catch (e) {
      this.displayAlert({title:e.error, description:JSON.stringify(e), icon:'error'})
    }
  }

  handleEvents() {
    try {
      this.obs.on("StreamStatus", res => console.log(res))
      this.obs.on("StreamStoped", res => console.log(res))
      this.obs.on("ConnectionClosed", () => console.log("Disconnected"))
      this.obs.on("error", e => console.log(`Error: ${e}`))
    } catch (e) {
      this.displayAlert({title: e.error, description: JSON.stringify(e), icon: "error"})
    }
  }

  async startStopRecording() {
    try {
      let recordingStatus = await this.obs.call("ToggleRecord")
      if (recordingStatus.outputActive) {
        this.getRecordingStatus()
        this.displayAlert({title: "Recording", description: "Recording has started", icon: "success"})
      } else if (!recordingStatus.outputActive && this.recordingInterval) {
        clearInterval(this.recordingInterval)
        this.recordingStop()
        this.displayAlert({title: "Recording", description: "Recording has stoped", icon: "info"})
      }
    } catch(e) {
      this.recordingError(e)
      console.error("There was an error while stopping the recording: ", JSON.stringify(e))
    }
  }

  async getRecordingStatus() {
    try {
      let recordingStatus = await this.obs.call("GetRecordStatus")
      if (recordingStatus.outputActive && !this.recordingInterval) {
        this.recordingInterval = setInterval(async () => {
          let outputs = await this.obs.call("GetOutputList")
          let recordingOutput = outputs.outputs.fing(output => output.outputActive)
          delete recordingOutput.outputFlags
          let outputSettings = await this.obs.call("GetOutputSettings", {outputName: recordingOutput.outputName})
          this.setRecordingStatus({data: {...recordingStatus, ...recordingOutput, ...outputSettings}})
        }, 1000);
      }
    } catch(e) {
      this.recordingError(e)
    }
  }

  async fetchScenes() {
    try {
      let scenes = await this.obs.call("GetSceneList")
      this.setScenes(scenes)
    } catch (e) {
      this.scenesError(e)
    }
  }

  async setCurrentScene(name){
    try {
      await this.obs.call("SetCurrentProgramScene", {"sceneName": name})
    } catch(e) {
      this.scenesError(e)
    }
  }

  async fetchScenePreview(){
    try {
      if (!this.scenePreviewInterval) {
        this.scenePreviewInterval = setInterval(async () => {
          let activeScene = await this.obs.call("GetCurrentProgramScene")
          let sceneImage = await this.obs.call("GetSourceScreenshot", {imageFormat: "jpeg", width: 800, sourceName: activeScene.currentProgramSceneName})
          this.setScenePreview(sceneImage)
        }, 1000);
      }
    } catch (e) {
      this.scenePreviewError(e)
    }
  }

  async startStopStreaming(){
    try {
      await this.obs.call("ToggleStream")
    } catch(e) {
      this.streamError(e)
    }
  }

  async getStreamingStatus() {
    try {
      if (!this.streamingInterval) {
        this.streamingInterval = setInterval(async () => {
          const streamStatus = await this.obs.call("GetStreamingStatus")
          this.setStreamStatus(streamStatus)
        }, 1000);
      }
    } catch (e) {
      this.streamError(e)
    }
  }

}

const ObsInstance = new ObsHandler()
Object.freeze(ObsInstance)
export default ObsInstance