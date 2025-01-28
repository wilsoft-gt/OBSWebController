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
    }
    return ObsHandler.instance
  }
  
  async connect(wsUrl) {
    try {
      let result = await this.obs.connect(wsUrl)
      if (result) {
        this.handleEvents()
        this.fetchScenes()
        this.fetchScenePreview()
        obsStore.getState().connect()
      }
    } catch (e) {
      console.error(e)
      alertStore.getState().displayAlert({title:e.error, description:JSON.stringify(e), icon:'error'})
    }
  }

  async disconnect() {
    try {
      await this.obs.disconnect()
      obsStore.getState().disconnect()
      clearInterval(this.recordingInterval)
      clearInterval(this.streamingInterval)
      clearInterval(this.scenePreviewInterval)
      this.scenePreviewInterval = undefined
      this.recordingInterval = undefined
      this.streamingInterval = undefined
    } catch (e) {
      console.error(e)
      alertStore.getState().displayAlert({title:e.error, description:JSON.stringify(e), icon:'error'})
    }
  }

  handleEvents() {
      this.obs.on("StreamStatus", res => console.log(res))
      this.obs.on("StreamStoped", res => console.log(res))
      this.obs.on("ConnectionClosed", (code, reason) => console.log("Disconnected, ", code, reason))
      this.obs.on("error", e => console.log(`Error: ${e}`))
  }

  async startStopRecording() {
    try {
      let recordingStatus = await this.obs.call("ToggleRecord")
      if (recordingStatus.outputActive) {
        this.getRecordingStatus()
        alertStore.getState().displayAlert({title: "Recording", description: "Recording has started", icon: "success"})
      } else if (!recordingStatus.outputActive && this.recordingInterval) {
        clearInterval(this.recordingInterval)
        recordingStore.getState().recordingStop()
        alertStore.getState().displayAlert({title: "Recording", description: "Recording has stoped", icon: "info"})
      }
    } catch(e) {
      console.error(e)
      recordingStore.getState().recordingError(e)
      console.error("There was an error while stopping the recording: ", JSON.stringify(e))
    }
  }

  async getRecordingStatus() {
    try {
      let recordingStatus = await this.obs.call("GetRecordStatus")
      if (recordingStatus.outputActive && !this.recordingInterval) {
        this.recordingInterval = setInterval(async () => {
          let outputs = await this.obs.call("GetOutputList")
          let recordingOutput = outputs.outputs.find(output => output.outputActive)
          delete recordingOutput.outputFlags
          let outputSettings = await this.obs.call("GetOutputSettings", {outputName: recordingOutput.outputName})
          recordingStore.getState().setRecordingStatus({data: {...recordingStatus, ...recordingOutput, ...outputSettings}})
        }, 1000);
      }
    } catch(e) {
      console.error(e)
      recordingStore.getState().recordingError(e)
    }
  }

  async fetchScenes() {
    try {
      let scenes = await this.obs.call("GetSceneList")
      scenesStore.getState().setScenes(scenes)
    } catch (e) {
      console.error(e)
      scenesStore.getState().scenesError(e)
    }
  }

  async setCurrentScene(name){
    try {
      await this.obs.call("SetCurrentProgramScene", {"sceneName": name})
      await this.fetchScenes()
    } catch(e) {
      console.error(e)
      scenesStore.getState().scenesError(e)
    }
  }

  async fetchScenePreview(){
    try {
      if (!this.scenePreviewInterval) {
        this.scenePreviewInterval = setInterval(async () => {
          let activeScene = await this.obs.call("GetCurrentProgramScene")
          let sceneImage = await this.obs.call("GetSourceScreenshot", {imageFormat: "jpeg", width: 800, sourceName: activeScene.currentProgramSceneName})
          scenePreviewStore.getState().setScenePreview(sceneImage)
        }, 1000);
      }
    } catch (e) {
      console.error(e)
      scenePreviewStore.getState().scenePreviewError(e)
    }
  }

  async startStopStreaming(){
    try {
      await this.obs.call("ToggleStream")
    } catch(e) {
      console.error(e)
      streamStore.getState().streamError(e)
    }
  }

  async getStreamingStatus() {
    try {
      if (!this.streamingInterval) {
        this.streamingInterval = setInterval(async () => {
          const streamStatus = await this.obs.call("GetStreamingStatus")
          streamStore.getState().setStreamStatus(streamStatus)
        }, 1000);
      }
    } catch (e) {
      console.error(e)
      streamStore.getState().streamError(e)
    }
  }

}

const ObsInstance = new ObsHandler()
//Object.freeze(ObsInstance)
export default ObsInstance