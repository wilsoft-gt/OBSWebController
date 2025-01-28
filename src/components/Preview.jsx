import { Spinner } from 'react-rainbow-components'
import { scenePreviewStore } from '../store/scenePreviewStore'


export const PreviewComponent = () => {
	const isLoading = scenePreviewStore(store => store.isLoading)
	const image = scenePreviewStore(store=>store.image)
	if (isLoading){
		return <Spinner size='large' variant='brand' type='arc' />

	} else if (image.error) {
		return <h3>{image.error.description}</h3>
	} else {
		return(
			<div className='d-flex flex-column justify-content-center align-items-center'>
				<img className='prev-img' src={image.image.imageData} />
			</div>
		)
	}
}
