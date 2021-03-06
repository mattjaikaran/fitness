import { LocationsEntity } from 'src/modules/locations/entities/locations.entity';
import { FeaturesEntity } from 'src/modules/settings/entities/features.entity';
import { FloorPlansEntity } from 'src/modules/settings/entities/floor-plans.entity';
import { StylesEntity } from 'src/modules/settings/entities/styles.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { TABLES } from '../../../consts/tables.const';
import { BoxFeaturesEntity } from './box-features.entity';
import { BoxRatesEntity } from './box-rate.entity';

@Entity({ name: TABLES.BOXES.name })
export class BoxesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 500 })
  shortDescription: string;

  @Column({ type: 'text' })
  longDescription: string;

  @Column({ type: 'decimal' })
  size: number;

  @Column({ type: 'decimal' })
  maxCapacity: number;

  @ManyToOne(() => FloorPlansEntity, (f) => f.boxes, {
    eager: true,
    cascade: true,
  })
  floorPlan: FloorPlansEntity;
  @RelationId('floorPlan')
  floorPlanId: number;

  @ManyToOne(() => StylesEntity, (s) => s.boxes, {
    eager: true,
    cascade: true,
  })
  style: StylesEntity;
  @RelationId('style')
  styleId: number;

  @ManyToOne(() => LocationsEntity, (l) => l.boxes, {
    eager: true,
    cascade: true,
  })
  location: LocationsEntity;
  @RelationId('location')
  locationId: number;

  @OneToMany(() => BoxFeaturesEntity, (feature) => feature.box)
  public boxFeatures!: BoxFeaturesEntity[];

  @ManyToMany(() => FeaturesEntity, (feature) => feature.boxes, {
    eager: true,
    cascade:true
  })
  @JoinTable({
    name: TABLES.BOX_FEATURES.name,
    joinColumn: { name: 'boxId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'featureId', referencedColumnName: 'id' },
  })
  features: FeaturesEntity[];

  @OneToMany(() => BoxRatesEntity, (d) => d.box, {
    eager: true,
    nullable: false,
  })
  rates: BoxRatesEntity[];

  @Column({ default: false })
  public heated: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
