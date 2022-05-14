import React, { useEffect, useState } from 'react';
import { openmrsFetch } from '@openmrs/esm-framework';
import { Button, DatePickerInput, RadioButton, RadioButtonGroup, SelectItem } from 'carbon-components-react';
import { Controller, useForm } from 'react-hook-form';
import {
  Card,
  DatePickerBox,
  Forms,
  GenderGroup,
  Heading,
  Label,
  NumberInputBox,
  Row,
  Section,
  SelectBox,
  TextInputBox,
  Wrapper,
} from './index.styled';
import { color } from '../../constants';
import Modal from '../Modal';
import axios from 'axios';
import { countriesList, mappedLocation } from '../../constants/location';
import moment from 'moment';
import _ from 'lodash';
import { JSONPath } from 'jsonpath-plus';

function RegistrationForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    getValues,
    setError,
    clearErrors,
    setFocus,
    setValue,
    control,
  } = useForm();

  const searchDropdown = watch('searchbar', 'TEMPID');
  const [yearBirth, setYearBirth] = useState('2022');
  const [searchResultData, setSearchResultData] = useState([]);
  const [selectModal, setSelectModal] = useState(false);
  const [gender, setGender] = useState('MALE');
  const [form, setForm] = useState({ mode: 'create' });

  const formSubmitHandler = (data) => {
    let origin = { name: 'CR', UPI: 'CR', NID: 'NPR', TEMPID: 'LOCAL' };
    // eslint-disable-next-line no-console
    console.log(data);
    alert('GENNEXT Team is still doing on this module... please contact system administrator.');
  };

  const findHandler = () => {
    const idSearchBox = getValues('idsearchbox');
    const surName = getValues('surname');
    const postName = getValues('postnames');

    if (searchDropdown === 'UPI' || searchDropdown === 'NID') {
      if (idSearchBox.length === 0) {
        setError('idsearchbox', { type: 'focus' }, { shouldFocus: true });
      } else {
        clearErrors('idsearchbox');
        searchByDocument();
      }
    }

    if (searchDropdown === 'name') {
      if (surName.length === 0) {
        setError('surname', { type: 'focus' }, { shouldFocus: true });
      } else {
        clearErrors('surname');
      }

      if (postName.length === 0) {
        setError('postnames', { type: 'focus' }, { shouldFocus: true });
      } else {
        clearErrors('postnames');
      }
      if (postName.length !== 0 || surName.length !== 0) {
        searchByName();
      }
    }
  };

  const searchByName = async () => {
    console.log({ message: 'call search' });
    // axios
    //   .get(`${openmrs}/patient/byNames`, {
    //     params: {
    //       surName: "%" + getValues("surname") + "%",
    //       postName: "%" + getValues("postnames") + "%",
    //       yearOfBirth: "2021",
    //       origin: getValues("searchIn"),
    //     },
    //   })
    //   .then((res) => {
    //     if (res.data?.results.length > 0) {
    //       setSelectModal(true);
    //       setSearchResultData(res.data?.results);
    //     } else {
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    openmrsFetch(`/ws/rest/v1/patient?q=emmanuel&v=default`, {
      method: 'get',
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchByDocument = () => {
    // axios
    //   .get(`${openmrs}/patient/byDocument`, {
    //     params: {
    //       documentNumber: getValues("idsearchbox"),
    //       documentType: searchDropdown,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.data?.results.length > 0) {
    //       setSelectModal(true);
    //       setSearchResultData(res.data?.results);
    //     } else {
    //       console.log("no data found");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const selectHandler = (selectedData) => {
    setSelectModal(false);

    let selectedItem = {};
    selectedData?.identifiers.forEach((element, index, array) => {
      selectedItem[element.system] = element.value;
    });

    // setValue("upid", selectedItem?.UPI);
    // setValue("pid", selectedItem?.PRIMARY_CARE_ID);
    // setValue("nidno", selectedItem?.NID_APPLICATION_NUMBER);
    // setValue("passport", selectedItem?.PASSPORT);
    // setValue("nid", selectedItem?.NID);
    // setValue("nin", selectedItem?.NIN);

    setValue('sname', selectedData?.surName);
    setValue('pname', selectedData?.postNames);

    if (selectedData?.gender === 'MALE') {
      setGender('MALE');
    } else {
      setGender('FEMALE');
    }
    setValue('vital', selectedData?.vital);
    setValue('maritalstatus', selectedData?.maritalStatus?.toLowerCase());

    // setValue('nationality', selectedData?.maritalStatus);

    setValue('age', selectedData?.age);
    setValue('fname', selectedData?.fatherName);
    setValue('mname', selectedData?.motherName);
    setValue('spouse', selectedData?.spouse);
    const postalAddress = _.filter(selectedData?.addressList, (data) => data.type === 'postal');
    const residentialAddress = _.filter(selectedData?.addressList, (data) => data.type === 'RESIDENTIAL');

    // console.log(selectedData?.addressList);
    setValue('country', postalAddress[0]?.country);
    setValue('province', postalAddress[0]?.state);
    setValue('district', postalAddress[0]?.district);
    setValue('sector', postalAddress[0]?.sector);
    setValue('cell', postalAddress[0]?.cell);

    setValue('phone', selectedData?.phoneNumber);
    setValue('village', postalAddress[0]?.text);

    setValue('rcountry', residentialAddress[0]?.country);
    setValue('rprovince', residentialAddress[0]?.state);
    setValue('rdistrict', residentialAddress[0]?.district);
    setValue('rsector', residentialAddress[0]?.sector);
    setValue('rcell', residentialAddress[0]?.cell);
    setValue('rphone', residentialAddress[0]?.phoneNumber);
    setValue('rvillage', residentialAddress[0]?.text);

    setValue('religion', selectedData?.religion);
    setValue('education', selectedData?.educationalLevel);
  };

  const escapeHandler = () => {
    setSelectModal(false);
  };

  useEffect(() => {
    setValue('dob', moment(new Date()).format('MM/DD/yyyy'));
    setValue('gender', 'MALE');
  }, []);

  return (
    <Wrapper>
      <Modal
        visibility={selectModal}
        data={searchResultData}
        selectHandler={selectHandler}
        escapeHandler={escapeHandler}
        setForm={setForm}
      />
      <Section>
        <Heading>Search</Heading>
        <Card>
          <SelectBox
            id="searchbar"
            noLabel
            style={{ marginBottom: 5 }}
            defaultValue="TEMPID"
            {...register('searchbar')}>
            <SelectItem value="TEMPID" text="Unknown" />
            <SelectItem value="UPI" text="UPID" />
            <SelectItem value="NID" text="NID" />

            <SelectItem value="NID_APPLICATION_NUMBER" text="Nid Application Number" />
            <SelectItem value="NIN" text="NIN" />
            <SelectItem value="PASSPORT" text="Passport" />
            <SelectItem value="FOREIGNER_ID" text="Foreigner Id" />
            <SelectItem value="name" text="Name" />
          </SelectBox>

          {searchDropdown === 'UPI' || searchDropdown === 'NID' ? (
            <>
              <TextInputBox
                id="idsearchbox"
                type="text"
                labelText="Specify Id"
                {...register('idsearchbox', {
                  required: searchDropdown === 'upid' || searchDropdown === 'nid',
                })}
                warn={errors.idsearchbox ? true : false}
              />

              <Button
                style={{
                  backgroundColor: color.appGreen,
                  marginRight: '1em',
                }}
                onClick={findHandler}
                type="submit">
                Find
              </Button>
            </>
          ) : null}

          {searchDropdown === 'name' ? (
            <>
              <SelectBox
                id="searchIn"
                labelText=" Search in"
                defaultValue="select"
                {...register('searchIn', { required: true })}>
                <SelectItem value="LOCAL" text="This Facility" />
                <SelectItem value="CR" text="Other Facility" />
                <SelectItem value="NPR" text="NIDA" />
              </SelectBox>
              <Row>
                <TextInputBox
                  style={{ margin: 5 }}
                  id="surname"
                  type="text"
                  labelText="Surname"
                  {...register('surname', { required: true })}
                  warn={errors.surname ? true : false}
                />
                <TextInputBox
                  style={{ margin: 5 }}
                  id="postnames"
                  type="text"
                  labelText="Post Names"
                  {...register('postnames', { required: true })}
                  warn={errors.postnames ? true : false}
                />
              </Row>
              <DatePickerBox
                datePickerType="single"
                style={{ paddingBottom: 10 }}
                onChange={(date) => {
                  setYearBirth(moment(date[0]).format('YYYY'));
                }}>
                <DatePickerInput
                  id="yearPicker"
                  labelText="Year of birth"
                  placeholder="yyyy"
                  size="sm"
                  value={yearBirth}
                />
              </DatePickerBox>

              <Button
                style={{
                  backgroundColor: color.appGreen,
                  marginRight: '1em',
                }}
                onClick={findHandler}
                type="submit">
                Find
              </Button>
            </>
          ) : null}
        </Card>
      </Section>
      <Forms onSubmit={handleSubmit(formSubmitHandler)}>
        <Section>
          <Heading>Identifers</Heading>
          <Label>All fields are required unless marked optional</Label>
          <Card>
            <TextInputBox
              id="upid"
              type="text"
              labelText="UPID"
              disabled={searchDropdown !== 'TEMPID'}
              {...register('upid', { required: searchDropdown !== 'TEMPID' })}
            />
            <TextInputBox
              id="pid"
              type="text"
              labelText="Primary care ID"
              disabled={searchDropdown !== 'TEMPID'}
              {...register('pid')}
            />
            <TextInputBox
              id="nid"
              type="text"
              labelText="NID"
              disabled={searchDropdown !== 'TEMPID'}
              {...register('nid', { required: searchDropdown !== 'TEMPID' })}
            />
            <TextInputBox
              id="nin"
              type="text"
              labelText="NIN"
              disabled={searchDropdown !== 'TEMPID'}
              {...register('nin', { required: searchDropdown !== 'TEMPID' })}
            />
            <TextInputBox
              id="nidno"
              type="text"
              disabled={searchDropdown !== 'TEMPID'}
              labelText="NID Application Number"
              {...register('nidno', { required: searchDropdown !== 'TEMPID' })}
            />
            <TextInputBox
              id="passport"
              type="text"
              labelText="Passport"
              disabled={searchDropdown !== 'TEMPID'}
              {...register('passport')}
            />
          </Card>
        </Section>
        <Section>
          <Heading id="personal-details">Person details</Heading>
          <Label>All fields are required unless marked optional</Label>
          <Card>
            <TextInputBox
              id="sname"
              type="text"
              labelText="Surname"
              disabled={searchDropdown !== 'TEMPID'}
              {...register('sname')}
            />
            <TextInputBox
              id="pname"
              type="text"
              disabled={searchDropdown !== 'TEMPID'}
              labelText="Post-names"
              {...register('pname')}
            />
            <Row>
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <DatePickerBox
                    datePickerType="single"
                    onChange={(e) => {
                      field.onChange(moment(e[0]).format('MM/DD/yyyy'));
                    }}
                    value={field.value}
                    maxDate={moment(new Date()).format('MM/DD/yyyy')}>
                    <DatePickerInput
                      id="date-picker"
                      disabled={searchDropdown !== 'TEMPID'}
                      size="sm"
                      labelText="Date of birth"
                      placeholder="mm/dd/yyyy"
                    />
                  </DatePickerBox>
                )}
              />
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <GenderGroup legendText="Gender">
                    <RadioButtonGroup
                      name="gender"
                      disabled={searchDropdown !== 'TEMPID'}
                      defaultSelected={gender}
                      onChange={(e) => {
                        // setGender(e);
                        field.onChange(e);
                      }}>
                      <RadioButton
                        value="MALE"
                        id="radio-male"
                        labelText="Male"
                        disabled={searchDropdown !== 'TEMPID'}
                      />
                      <RadioButton
                        value="FEMALE"
                        labelText="Female"
                        id="radio-female"
                        disabled={searchDropdown !== 'TEMPID'}
                      />
                    </RadioButtonGroup>
                  </GenderGroup>
                )}
              />
            </Row>
            <SelectBox
              id="vital"
              labelText="Vital Status"
              disabled={searchDropdown !== 'TEMPID'}
              defaultValue=""
              {...register('vital')}>
              <SelectItem disabled hidden value="" text="Select" />
              <SelectItem value="Alive" text="Alive" />
              <SelectItem value="Deceased" text="Deceased" />
            </SelectBox>
            <SelectBox
              id="maritalstatus"
              labelText="Martial Status"
              disabled={searchDropdown !== 'TEMPID'}
              defaultValue=""
              {...register('maritalstatus')}>
              <SelectItem disabled hidden value="" text="Select" />
              <SelectItem value="single" text="Single" />
              <SelectItem value="married" text="Married" />
              <SelectItem value="divorced" text="Divorced" />
              <SelectItem value="widdowed" text="Widdowed" />
            </SelectBox>

            <SelectBox
              id="nationality"
              disabled={searchDropdown !== 'TEMPID'}
              labelText="Nationality"
              defaultValue="RW"
              {...register('nationality')}>
              {countriesList.map((data, index) => (
                <SelectItem value={data.value} text={data.nationality} key={index} />
              ))}
            </SelectBox>

            {/* <NumberInputBox
              id="age"
              disabled={searchDropdown !== "TEMPID"}
              label={"Age"}
              {...register("age")}
            /> */}
            <TextInputBox
              id="fname"
              type="text"
              disabled={searchDropdown !== 'TEMPID'}
              labelText="Father name"
              {...register('fname')}
            />
            <TextInputBox
              id="mname"
              type="text"
              disabled={searchDropdown !== 'TEMPID'}
              labelText="Mother name"
              {...register('mname')}
            />
            <TextInputBox
              id="spouse"
              type="text"
              labelText="Spouse"
              disabled={searchDropdown !== 'TEMPID'}
              {...register('spouse')}
            />
          </Card>
        </Section>
        <Section>
          <Heading id="domicile-details">Domicile Details</Heading>
          <Label>All fields are required unless marked optional</Label>
          <Card>
            <TextInputBox
              id="country"
              type="text"
              labelText="Country"
              disabled={searchDropdown !== 'TEMPID'}
              {...register('country')}
            />
            <TextInputBox
              id="province"
              type="text"
              labelText="Province"
              disabled={searchDropdown !== 'TEMPID'}
              {...register('province')}
            />

            <TextInputBox
              id="district"
              type="text"
              disabled={searchDropdown !== 'TEMPID'}
              labelText="District"
              {...register('district')}
            />
            <TextInputBox
              id="sector"
              type="text"
              disabled={searchDropdown !== 'TEMPID'}
              labelText="Sector"
              {...register('sector')}
            />
            <TextInputBox
              id="cell"
              type="text"
              labelText="Cell"
              disabled={searchDropdown !== 'TEMPID'}
              {...register('cell')}
            />
            <TextInputBox
              id="village"
              type="text"
              disabled={searchDropdown !== 'TEMPID'}
              labelText="Village"
              {...register('village')}
            />
          </Card>
        </Section>
        <Section>
          <Heading id="residence-details">Residence Details</Heading>
          <Label>All fields are required unless marked optional</Label>
          <Card>
            <SelectBox id="rcountry" defaultValue="Rwanda" labelText="Country" {...register('rcountry')}>
              {JSONPath({ path: 'value', json: mappedLocation }).map((ele, index) => {
                return <SelectItem value={ele} text={ele} key={index} />;
              })}
            </SelectBox>

            <SelectBox id="rprovince" defaultValue="" labelText="Province" {...register('rprovince')}>
              <SelectItem value="" text="Select" />
              {JSONPath({ path: 'children.*.value', json: mappedLocation }).map((ele, index) => {
                return <SelectItem value={ele} text={ele} key={index} />;
              })}
            </SelectBox>

            <SelectBox id="rdistrict" defaultValue="" labelText="District" {...register('rdistrict')}>
              <SelectItem value="" text="Select" />
              {JSONPath({
                path: 'children[?(@.value=="' + watch('rprovince') + '" && @.id=="PROVINCE")] .children.*.value',
                json: mappedLocation,
              }).map((ele, index) => {
                return <SelectItem value={ele} text={ele} key={index} />;
              })}
            </SelectBox>

            <SelectBox id="rsector" defaultValue="" labelText="Sector" {...register('rsector')}>
              <SelectItem value="" text="Select" />
              {JSONPath({
                path:
                  'children[?(@.value=="' +
                  watch('rprovince') +
                  '" && @.id=="PROVINCE")].children[?(@.value=="' +
                  watch('rdistrict') +
                  '" && @.id=="DISTRICT")].children.*.value',
                json: mappedLocation,
              }).map((ele, index) => {
                return <SelectItem value={ele} text={ele} key={index} />;
              })}
            </SelectBox>

            <SelectBox id="rcell" defaultValue="" labelText="Cell" {...register('rcell')}>
              <SelectItem value="" text="Select" />
              {JSONPath({
                path:
                  'children[?(@.value=="' +
                  watch('rprovince') +
                  '" && @.id=="PROVINCE")].children[?(@.value=="' +
                  watch('rdistrict') +
                  '" && @.id=="DISTRICT")].children[?(@.value=="' +
                  watch('rsector') +
                  '" && @.id=="SECTOR")].children.*.value',
                json: mappedLocation,
              }).map((ele, index) => {
                return <SelectItem value={ele} text={ele} key={index} />;
              })}
            </SelectBox>

            <SelectBox id="rvillage" defaultValue="" labelText="Village" {...register('rvillage')}>
              <SelectItem value="" text="Select" />
              {JSONPath({
                path:
                  'children[?(@.value=="' +
                  watch('rprovince') +
                  '" && @.id=="PROVINCE")].children[?(@.value=="' +
                  watch('rdistrict') +
                  '" && @.id=="DISTRICT")].children[?(@.value=="' +
                  watch('rsector') +
                  '" && @.id=="SECTOR")].children[?(@.value=="' +
                  watch('rcell') +
                  '" && @.id=="CELL")].children.*.value',
                json: mappedLocation,
              }).map((ele, index) => {
                return <SelectItem value={ele} text={ele} key={index} />;
              })}
            </SelectBox>

            <TextInputBox id="address" type="text" labelText="Address" {...register('address')} />
          </Card>
        </Section>

        <Section>
          <Heading id="other-details">Other Details</Heading>
          <Label>All fields are required unless marked optional</Label>
          <Card>
            <TextInputBox id="phone" type="text" labelText="Phone" {...register('phone')} />
            <SelectBox id="select-education" labelText="Education Level" defaultValue="" {...register('education')}>
              <SelectItem disabled hidden value="" text="Select" />
              <SelectItem value="None/never attended" text="None/never attended" />
              <SelectItem value="Preschool" text="Preschool" />
              <SelectItem value="Primary" text="Primary" />
              <SelectItem value="Post-primary" text="Post-primary" />
              <SelectItem value="Lower secondary" text="Lower secondary" />
              <SelectItem value="Upper secondary" text="Upper secondary" />
              <SelectItem value="University or higher" text="University or higher" />
            </SelectBox>
            <TextInputBox id="religion" type="text" labelText="Religion" {...register('religion')} />
            <SelectBox id="select-profession" labelText="Profession" defaultValue="" {...register('profession')}>
              <SelectItem disabled hidden value="" text="Select" />
              <SelectItem value="Airline/Airport worker" text="Airline/Airport worker" />
              <SelectItem value="Animal culler" text="Animal culler" />
              <SelectItem value="Butcher" text="Butcher" />
              <SelectItem value="Child care" text="Child care" />
              <SelectItem value="FARMER" text="FARMER" />
              <SelectItem value="HEALTH CARE PROVIDER" text="HEALTH CARE PROVIDER" />
              <SelectItem value="Lab worker" text="Lab worker" />
              <SelectItem value="OTHER NON-CODED" text="OTHER NON-CODED" />
              <SelectItem value="Office worker" text="Office worker" />
              <SelectItem value="STUDENT" text="STUDENT" />
              <SelectItem value="TRADITIONAL HEALER" text="TRADITIONAL HEALER" />
              <SelectItem value="Teacher/assistant" text="Teacher/assistant" />
              <SelectItem value="Veterinarian" text="Veterinarian" />
            </SelectBox>
          </Card>
        </Section>
        <Section>
          <Row>
            <Button
              style={{
                backgroundColor: color.appGreen,
                marginRight: '1em',
              }}
              type="submit">
              {form.mode === 'create' ? 'Create Patient' : form.mode === 'edit' ? 'Update Patient' : null}
            </Button>
            <Button
              kind="ghost"
              style={{
                color: color.appGreen,
              }}
              onClick={() => {
                reset();
                setValue('searchbar', 'TEMPID');
              }}>
              Clear
            </Button>
          </Row>
        </Section>
      </Forms>
    </Wrapper>
  );
}

export default RegistrationForm;
