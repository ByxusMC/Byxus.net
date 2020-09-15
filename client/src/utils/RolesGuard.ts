class RolesGuards {
	/**
	 *
	 * @param user
	 * @param module
	 * @param action
	 * @returns boolean
	 */
	public firewall(user: any, module: any, action: string): boolean {
		const { roles } = user
		let hasRole = false
		module[action].forEach((moduleRole: any) => {
			const { id } = moduleRole
			roles.forEach((userRole: any) => {
				if (id === userRole.id || userRole.id === 1 || userRole.id === 2) {
					hasRole = true
				}
			})
		})
		return hasRole
	}
}

export default new RolesGuards()
