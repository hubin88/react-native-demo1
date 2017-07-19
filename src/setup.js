/**
 * Created by huoban-xia on 2017/7/14.
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  Picker,
  TextInput,
  Modal,
  TouchableHighlight,
  Switch,
  StyleSheet
} from 'react-native';
import Button from './components/button';
import { openDataPick, openTimePick } from './until/tools';
export default class Setup extends Component {
  static defaultProps = {
    partyTypeSeletScope: [{
      label: '沙龙',
      value: 1,
    }, {
      label: '聚餐',
      value: 2,
    }, {
      label: '培训',
      value: 3,
    }, {
      label: '郊游',
      value: 4,
    }, {
      label: '打球',
      value: 5,
    }, {
      label: '其他',
      value: 6,
    },],
    partyCostSeletScope: [{
      label: '免费',
      value: 1,
    }, {
      label: '我买单',
      value: 2,
    }, {
      label: 'AA',
      value: 3,
    }, {
      label: '设置费用',
      value: 4,
    },],
  };

  constructor(props) {
    super(props);
    this.state = {
      partyType: '',//聚会类型
      partyTheme: '',//聚会主题
      partyAddress: '',//聚会地点
      partyTime: '请设置聚会时间',
      partyCost: 0,//聚会费用选项
      costModalVisible: false,
      backModalVisible: false,
      cost: 0,//聚会费用
      partySetting: '选填，未设置',
      settingLeft: '100%',
      descriptionLeft: '100%',
      partyPhone: '',//聚会咨询电话
      partyNumber: '',//聚会限制人数
      partyEndTime: '请设置报名截止时间',
      showSetting: false,
      settingName: true,
      settingPhone: false,
      settingID: false,
      description: '选填，未设置',
      transparentContent: '',
      remainNum: 0,
    };
  }

  openStartTime = () => {
    openDataPick(new Date(), new Date().setMonth(new Date().getMonth() + 3), (year, month, day) => {
      let MONTH = month + 1, DAY = day;
      MONTH = MONTH < 10 ? ('0' + MONTH) : MONTH;
      DAY = DAY < 10 ? ('0' + DAY) : DAY;
      openTimePick((hour, minute) => {
        const flag = new Date(year, month, day, hour, minute, 0, 0).getTime() <= new Date().getTime();
        if (flag) {
          Alert.alert('开始时间不能早于当前时间！');
          return false;
        }
        let HOUR = hour, MINUTE = minute;
        HOUR = HOUR < 10 ? ('0' + HOUR) : HOUR;
        MINUTE = MINUTE < 10 ? ('0' + MINUTE) : MINUTE;
        this.setState({
          partyTime: `${year}-${MONTH}-${DAY} ${HOUR}:${MINUTE}`,
        })
      });
    });
  };
  openEndTime = () => {
    const max = this.state.partyTime.includes('-') ? new Date(this.state.partyTime.replace(/-/g, '/')) : new Date();
    openDataPick(new Date(), max, (year, month, day) => {
      let MONTH = month + 1, DAY = day;
      MONTH = MONTH < 10 ? ('0' + MONTH) : MONTH;
      DAY = DAY < 10 ? ('0' + DAY) : DAY;
      openTimePick((hour, minute) => {
        let HOUR = hour, MINUTE = minute;
        HOUR = HOUR < 10 ? ('0' + HOUR) : HOUR;
        MINUTE = MINUTE < 10 ? ('0' + MINUTE) : MINUTE;
        this.setState({
          partyEndTime: `${year}-${MONTH}-${DAY} ${HOUR}:${MINUTE}`,
        })
      });
    });
  };
  setCost = (value) => {
    this.setState({
      partyCost: value
    });
    if (value === 4) {
      this.setState({
        costModalVisible: true,
      })
    }
  };
  cancelSetCost = () => {
    this.setState({
      costModalVisible: false,
      cost: 0,
    });
  };
  sureSetCost = () => {
    if (!this.state.cost) {
      Alert.alert('金额不能为空');
      return false;
    }
    this.setState({
      costModalVisible: false,
    });
  };
  showSetting = () => {
    this.setState({
      settingLeft: 0,
    });
  };
  cancelSetting = () => {
    this.setState({
      backModalVisible: true,
    });
  };
  sureSetting = () => {
    this.setState({
      settingLeft: '100%',
      partySetting: '已设置',
    });
  };
  hideSetting = () => {
    this.setState({
      backModalVisible: false,
      settingLeft: '100%',
      partyEndTime: this.state.partyEndTime,
      partyPhone: this.state.partyPhone,
      partyNumber: this.state.partyNumber,
      showSetting: false,
    });
  };
  showDescription = () => {
    this.setState({
      descriptionLeft: 0,
    });
  };
  cancelTransparent=()=>{
    this.setState({
      descriptionLeft: '100%',
      description: '选填，未设置',
    });
  };
  sureTransparent=()=>{
    this.setState({
      descriptionLeft: '100%',
      description: this.state.descriptionContent,
    });
  };
  render() {
    return (
      <View style={styles.app}>
        <View style={styles.home}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Image
                source={require('./images/back.png')}
                style={{ width: 20, height: 20, marginLeft: 20, marginTop: 5 }}
                resizeMode={'contain'}
              />
            </View>
            <View style={styles.headerContent}>
              <Text style={{ alignSelf: 'center', fontWeight: "bold", fontSize: 24, }}>发起聚会</Text>
            </View>
            <View style={styles.headerContent}>
              <Text style={{ marginRight: 20, color: "#000", fontSize: 20 }}>发布</Text>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.item}>
              <Text style={styles.label}>类型</Text>
              <View style={styles.value}>
                <Picker
                  selectedValue={this.state.partyType}
                  onValueChange={(value) => this.setState({ partyType: value })}
                ><Picker.Item label='请选择聚会类型' value={0} />
                  {this.props.partyTypeSeletScope.map((item, index) =>
                    <Picker.Item
                      key={index}
                      label={item.label}
                      value={item.value}
                    />
                  )}
                </Picker>
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>主题</Text>
              <View style={styles.value}>
                <TextInput
                  style={styles.text}
                  underlineColorAndroid="transparent"
                  maxLength={25}
                  placeholder="请输入聚会主题，25字以内"
                  onChangeText={(value) => this.setState({ partyTheme: value })}
                />
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>地点</Text>
              <View style={styles.value}>
                <TextInput
                  style={styles.text}
                  underlineColorAndroid="transparent"
                  placeholder="请输入聚会地点"
                  onChangeText={(value) => this.setState({ partyAddress: value })}
                />
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>时间</Text>
              <View style={styles.value}>
                <Text
                  style={styles.text}
                  onPress={this.openStartTime}
                >
                  {this.state.partyTime}
                </Text>
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>费用</Text>
              <View style={styles.value}>
                <Picker
                  selectedValue={this.state.partyCost}
                  onValueChange={(value) => {this.setCost(value)}}
                ><Picker.Item label='请设置聚会费用' value={0} />
                  {this.props.partyCostSeletScope.map((item, index) =>
                    <Picker.Item
                      key={index}
                      label={item.label}
                      value={item.value}
                    />
                  )}
                </Picker>
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>报名设置</Text>
              <View style={styles.value}>
                <Text
                  style={styles.text}
                  onPress={this.showSetting}
                >
                  {this.state.partySetting}
                </Text>
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>聚会描述</Text>
              <View style={styles.value}>
                <Text
                  style={styles.text}
                  onPress={this.showDescription}
                >
                  {this.state.description}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.setting, { left: this.state.settingLeft }]}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <TouchableHighlight onPress={this.cancelSetting}>
                <Image
                  source={require('./images/back.png')}
                  style={{ width: 20, height: 20, marginLeft: 20, marginTop: 5 }}
                  resizeMode={'contain'}
                />
              </TouchableHighlight>
            </View>
            <View style={styles.headerContent}>
              <Text style={{ alignSelf: 'center', fontWeight: "bold", fontSize: 24, }}>报名设置</Text>
            </View>
            <View style={styles.headerContent}>
              <Text
                style={{ marginRight: 20, color: "#000", fontSize: 20 }}
                onPress={this.sureSetting}
              >保存</Text>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.item}>
              <Text style={styles.label}>咨询电话</Text>
              <View style={styles.value}>
                <TextInput
                  style={styles.text}
                  underlineColorAndroid="transparent"
                  maxLength={11}
                  keyboardType="phone-pad"
                  placeholder="请输入电话"
                  onChangeText={(value) => this.setState({ partyPhone: value })}
                />
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>人数限制</Text>
              <View style={styles.value}>
                <TextInput
                  style={styles.text}
                  underlineColorAndroid="transparent"
                  keyboardType="numeric"
                  placeholder="默认无限制"
                  onChangeText={(value) => this.setState({ partyNumber: value })}
                />
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>截止时间</Text>
              <View style={styles.value}>
                <Text
                  style={styles.text}
                  onPress={this.openEndTime}
                >
                  {this.state.partyEndTime}
                </Text>
              </View>
            </View>
            <Text
              style={{ paddingLeft: 10, paddingRight: 10, marginTop: 10, marginBottom: 10 }}>报名截止之前用户可以随时取消报名</Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 10,
              paddingLeft: 10,
              backgroundColor: '#eee',
            }}>
              <Text style={{ fontSize: 18, lineHeight: 25, flex: 1 }}>设置用户报名时必填项</Text>
              <Switch
                value={this.state.showSetting}
                onValueChange={(value) => {this.setState({ showSetting: value })}}
              />
            </View>
            {this.state.showSetting ?
              <View>
                <View style={styles.settingItem}>
                  <Text style={styles.label}>姓名</Text>
                  <Switch value={this.state.settingName} />
                </View>
                <View style={styles.settingItem}>
                  <Text style={styles.label}>手机号</Text>
                  <Switch value={this.state.settingPhone}
                          onValueChange={(value) => {this.setState({ settingPhone: value })}} />
                </View>
                <View style={styles.settingItem}>
                  <Text style={styles.label}>身份证</Text>
                  <Switch value={this.state.settingID}
                          onValueChange={(value) => {this.setState({ settingID: value })}} />
                </View>
                <Text style={{
                  height: 40,
                  lineHeight: 30,
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginBottom: 10,
                  backgroundColor: '#eee',
                }}>以上三项，需设置费用才能生效</Text>
              </View> : null}
          </View>
        </View>
        <View style={[styles.setting, { left: this.state.descriptionLeft }]}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <TouchableHighlight onPress={this.cancelTransparent}>
                <Image
                  source={require('./images/back.png')}
                  style={{ width: 20, height: 20, marginLeft: 20, marginTop: 5 }}
                  resizeMode={'contain'}
                />
              </TouchableHighlight>
            </View>
            <View style={styles.headerContent}>
              <Text style={{ alignSelf: 'center', fontWeight: "bold", fontSize: 24, }}>聚会描述</Text>
            </View>
            <View style={styles.headerContent}>
              <Text
                style={{ marginRight: 20, color: "#000", fontSize: 20 }}
                onPress={this.sureTransparent}
              >保存</Text>
            </View>
          </View>
          <TextInput
            value={this.state.descriptionContent}
            multiline={true}
            numberOfLines={10}
            underlineColorAndroid="transparent"
            style={{ textAlignVertical: 'top' }}
            onChangeText={(value) => {
              this.setState({
                descriptionContent: value,
                remainNum: value.length
              })
            }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
            <Text>{this.state.remainNum}/300字</Text>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.costModalVisible}
          onRequestClose={this.cancelSetCost}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerModalContainer}>
              <Text style={styles.modalContainerTitle}>设置费用</Text>
              <TextInput style={styles.modalContainerText} keyboardType="numeric"
                         placeholder="请输入金额"
                         onChangeText={(value) => this.setState({ cost: value })} />
              <View style={styles.modalContainerButton}>
                <Button style={[styles.buttonStyle, { backgroundColor: '#fff' }]}
                        onPress={this.cancelSetCost}>取消</Button>
                <Button style={[styles.buttonStyle, { backgroundColor: '#62C0C1' }]}
                        onPress={this.sureSetCost}>确定</Button>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.backModalVisible}
          onRequestClose={() => {this.setState({ backModalVisible: false })}}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerModalContainer}>
              <Text style={styles.modalContainerTitle}>确定放弃本次设置？</Text>
              <View style={styles.modalContainerButton}>
                <Button style={[styles.buttonStyle, { backgroundColor: '#fff' }]}
                        onPress={() => {this.setState({ backModalVisible: false })}}>取消</Button>
                <Button style={[styles.buttonStyle, { backgroundColor: '#62C0C1' }]}
                        onPress={this.hideSetting}>确定</Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  app: {
    position: 'relative',
    overflow: 'hidden',
  },
  home: {},
  setting: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContent: {
    alignItems: 'center',
  },
  container: {
    height: '100%',
  },
  item: {
    height: 50,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  label: {
    height: 50,
    width: 100,
    fontSize: 20,
    lineHeight: 40,
    color: '#000',
  },
  value: {
    flex: 1,
    height: 50,
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    height: 50,
    padding: 0,
    fontSize: 20,
    textAlignVertical: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  innerModalContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalContainerTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
    lineHeight: 18,
  },
  modalContainerText: {
    width: 150,
    marginBottom: 10,
    fontSize: 18,
    lineHeight: 18,
    textAlign: 'center',
  },
  modalContainerButton: {
    width: '100%',
    flexDirection: 'row',
  },
  buttonStyle: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  settingItem: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});