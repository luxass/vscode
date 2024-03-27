/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { IJSONSchema } from 'vs/base/common/jsonSchema';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { IContextKeyService } from 'vs/platform/contextkey/common/contextkey';
import { extHostNamedCustomer, IExtHostContext } from 'vs/workbench/services/extensions/common/extHostCustomers';
import { ExtHostContext, MainContext, type ExtHostSchemasShape, type MainThreadSchemasShape } from '../common/extHost.protocol';
import * as JSONContributionRegistry from 'vs/platform/jsonschemas/common/jsonContributionRegistry';
import { Registry } from 'vs/platform/registry/common/platform';

@extHostNamedCustomer(MainContext.MainThreadSchemas)
export class MainThreadSchemas implements MainThreadSchemasShape {

	private readonly _proxy: ExtHostSchemasShape;

	constructor(
		extHostContext: IExtHostContext,
		@IConfigurationService _configurationService: IConfigurationService,
		@IContextKeyService protected contextKeyService: IContextKeyService,
	) {
		this._proxy = extHostContext.getProxy(ExtHostContext.ExtHostSchemas);
	}

	dispose(): void {
	}

	$getSchemas(): Promise<{ [id: string]: IJSONSchema }> {
		const JSONRegistry: JSONContributionRegistry.IJSONContributionRegistry = Registry.as<JSONContributionRegistry.IJSONContributionRegistry>(JSONContributionRegistry.Extensions.JSONContribution);

		const schemaContributions: JSONContributionRegistry.ISchemaContributions = JSONRegistry.getSchemaContributions();
		// const schemaJson: string = JSON.stringify(schemaContributions, null, 2);
		return Promise.resolve(schemaContributions.schemas);
	}

}
