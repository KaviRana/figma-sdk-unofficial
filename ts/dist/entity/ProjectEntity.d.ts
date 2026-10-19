import { FigmaEntityBase } from '../FigmaEntityBase';
import type { FigmaSDK } from '../FigmaSDK';
import type { Control } from '../types';
import type { Project, ProjectLoadMatch, ProjectListMatch } from '../FigmaTypes';
declare class ProjectEntity extends FigmaEntityBase<Project> {
    constructor(client: FigmaSDK, entopts: any);
    make(this: ProjectEntity): ProjectEntity;
    load(this: any, reqmatch?: ProjectLoadMatch, ctrl?: Control): Promise<ProjectEntity>;
    list(this: any, reqmatch?: ProjectListMatch, ctrl?: Control): Promise<ProjectEntity[]>;
}
export { ProjectEntity };
