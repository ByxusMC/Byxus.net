class RolesGuards {
	/**
	 *
	 * @param user
	 * @param module
	 * @param action
	 * @returns boolean
	 */
	public firewall(user: any, module: any, action: string): boolean {
		const roles = user.roles || []
		let hasRole: boolean = false

		roles.filter((role: { id: number }) => {
			if (role.id === 1 || role.id === 2) hasRole = true
		})

		module[action].forEach((moduleRole: any) => {
			const { id } = moduleRole
			roles.forEach((userRole: any) => {
				if (id === userRole.id) {
					hasRole = true
				}
			})
		})
		return hasRole
	}
}

export default new RolesGuards()
