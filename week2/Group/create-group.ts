import { Group } from "./dto/group.dto"

export const createGroup = (dto: Group, groups: Group[]) => {
    const groupExists = groups.some(group => group.group_id === dto.group_id);
    if (!groupExists) {
        groups.push(dto);
    }
}
