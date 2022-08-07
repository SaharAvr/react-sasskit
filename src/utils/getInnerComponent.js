import _ from 'lodash';

export default (Component, props) => {

  if (!_.isFunction(Component)) {
    return Component;
  }

  let InnerComponent = Component(props);

  while (_.isFunction(InnerComponent.type)) {
    InnerComponent = InnerComponent.type({ ...InnerComponent.props });
  }

  return InnerComponent;

};
