class RolesGuards {
	/**
	 * Allow or disallow administration mode
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

		module[action].forEach((moduleRole: { id: number }) => {
			const { id } = moduleRole
			roles.forEach((userRole: any) => {
				if (id === userRole.id) {
					hasRole = true
				}
			})
		})
		return hasRole
	}

	public heightRole(roles: Array<any>) {
		if (roles == undefined) return false
		let maxPower: number = 0
		roles.forEach((role) => {
			if (role.power >= maxPower) maxPower = role.power
		})

		return roles.filter((role) => {
			return role.power === maxPower
		})[0]
	}
}

export default new RolesGuards()
