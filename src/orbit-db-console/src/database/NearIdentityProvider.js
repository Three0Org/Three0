import { keyStores } from 'near-api-js'
import IdentityProvider from 'orbit-db-identity-provider'
import { nearConfig as NEAR_CONFIG } from '../../../utils'

const js_sha256 = require('js-sha256')

export default class NearIdentityProvider extends IdentityProvider {
	// return type
	static get type() {
		return 'NearIdentity'
	}

	// return identifier of external id (eg. a public key)
	async getId() {
		return window.accountId
	}

	// return a signature of data (signature of the OrbitDB public key)
	async signIdentity(data) {
		const dataBuffer = convertToArray(data)
		const keyStore = new keyStores.BrowserLocalStorageKeyStore()
		const keyPair = await keyStore.getKey(
			NEAR_CONFIG.networkId,
			window.accountId
		)
		return keyPair.sign(dataBuffer).signature
	}

	// return true if identity.signatures are valid
	static async verifyIdentity(identity) {
		const keyStore = new keyStores.BrowserLocalStorageKeyStore()
		const keyPair = await keyStore.getKey(
			NEAR_CONFIG.networkId,
			window.accountId
		)
		return keyPair.verify(
			convertToArray(identity.publicKey + identity.signatures.id),
			identity.signatures.publicKey
		)
	}
}

function convertToArray(data) {
	return Uint8Array.from(js_sha256.sha256.array(data))
}
