import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import Skill  from '../../model/Skill'
import skill  from '../../api/skill';

class DropdownSkillsSelection extends React.Component {
  state = { skills: [] };

  componentDidMount() {
    this.fetchSkills();
  }

  async fetchSkills() {
    try {
      const skillResponse = await skill.get('/');
      const skills = skillResponse.data.map((skillData) => new Skill(skillData.id, skillData.name));
      this.setState({ skills });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const options = this.state.skills.map(skill => { return { key: skill.id, text: skill.name, value: skill.id } });
    return <Dropdown placeholder="Filter by skills" fluid multiple selection onChange={this.props.skillsChanged} options={options}/>
  }
};

export default DropdownSkillsSelection;