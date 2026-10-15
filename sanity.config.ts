import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {schemaTypes} from './src/sanity/schemaTypes';
// Set NEXT_PUBLIC_SANITY_PROJECT_ID before starting Sanity Studio.
export default defineConfig({
 name:'lmc',title:'Lương Minh Content Studio',
 projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||'missing-project-id',
 dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||'production',
 plugins:[structureTool()],schema:{types:schemaTypes}
});
